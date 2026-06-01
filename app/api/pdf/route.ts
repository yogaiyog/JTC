import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const runtime = "nodejs";

type DocType = "rubric" | "soal";

function sanitizeFilename(input: string) {
  const name = path.basename(input);
  if (!name.toLowerCase().endsWith(".md")) return null;
  // Only allow a conservative set of characters to avoid weird path tricks.
  if (!/^[A-Za-z0-9._ -]+\.md$/.test(name)) return null;
  return name;
}

function markdownToPlainText(markdown: string) {
  return markdown
    .replace(/\r\n/g, "\n")
    .replace(/```[\s\S]*?```/g, (block) => {
      // Keep code blocks readable but without backticks.
      return block.replace(/```[a-zA-Z0-9_-]*\n?/g, "").replace(/```/g, "");
    })
    .replace(/^#{1,6}\s+/gm, "") // headings
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\[(.+?)\]\((.+?)\)/g, "$1 ($2)")
    .replace(/^\s*[-*+]\s+/gm, "- ")
    .replace(/^\s*\d+\.\s+/gm, "- ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function toPdfSafeText(input: string) {
  return input
    .replace(/[–—]/g, "-")
    .replace(/[“”]/g, '"')
    .replace(/[’‘]/g, "'")
    .replace(/\u00a0/g, " ")
    // Strip remaining non-ASCII to avoid PDFKit font glyph errors.
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "");
}

async function readDoc(docType: DocType, filename: string) {
  const baseDir =
    docType === "rubric"
      ? path.join(process.cwd(), "Document Lomba", "Rubric")
      : path.join(process.cwd(), "Document Lomba", "Soal");
  const fullPath = path.join(baseDir, filename);
  return await fs.readFile(fullPath, "utf8");
}

async function generatePdfBuffer(title: string, bodyText: string) {
  const pdf = await PDFDocument.create();
  const titleFont = await pdf.embedFont(StandardFonts.HelveticaBold);
  const bodyFont = await pdf.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595.28; // A4
  const pageHeight = 841.89; // A4
  const margin = 50;
  const titleSize = 18;
  const bodySize = 11;
  const lineGap = 4;
  const maxWidth = pageWidth - margin * 2;

  let page = pdf.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const safeTitle = toPdfSafeText(title);
  const safeBody = toPdfSafeText(bodyText);

  page.drawText(safeTitle, {
    x: margin,
    y: y - titleSize,
    font: titleFont,
    size: titleSize,
    color: rgb(0.07, 0.07, 0.07)
  });
  y -= titleSize + 14;

  const paragraphs = safeBody.split("\n");
  for (const paragraph of paragraphs) {
    const lines = bodyFont.widthOfTextAtSize(paragraph, bodySize) <= maxWidth
      ? [paragraph]
      : wrapText(paragraph, bodyFont, bodySize, maxWidth);

    for (const line of lines) {
      if (y <= margin + bodySize) {
        page = pdf.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      }
      page.drawText(line, {
        x: margin,
        y: y - bodySize,
        font: bodyFont,
        size: bodySize,
        color: rgb(0.13, 0.13, 0.13)
      });
      y -= bodySize + lineGap;
    }

    y -= 2;
  }

  const bytes = await pdf.save();
  return Buffer.from(bytes);
}

function wrapText(text: string, font: PDFFontLike, fontSize: number, maxWidth: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    const width = font.widthOfTextAtSize(candidate, fontSize);
    if (width <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines.length > 0 ? lines : [""];
}

type PDFFontLike = {
  widthOfTextAtSize: (text: string, size: number) => number;
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type") as DocType | null;
  const file = url.searchParams.get("file");
  const providedPassword = url.searchParams.get("p");

  if (type !== "rubric" && type !== "soal") {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
  if (!file) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const safeFile = sanitizeFilename(file);
  if (!safeFile) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  if (type === "soal") {
    const password = process.env.SOAL_PASSWORD ?? "jtc";
    if (providedPassword !== password) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
  }

  try {
    let markdown: string;
    try {
      markdown = await readDoc(type, safeFile);
    } catch {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const title = safeFile.replace(/\.md$/i, "").replace(/[-_]+/g, " ").trim();
    const plain = markdownToPlainText(markdown);
    let pdf: ArrayBuffer;
    try {
      const buf = await generatePdfBuffer(title, plain);
      pdf = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    } catch {
      return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
    }

    const downloadName = safeFile.replace(/\.md$/i, ".pdf");
    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${downloadName}"`
      }
    });
  } catch {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

export async function HEAD(req: Request) {
  const res = await GET(req);
  // Match status + headers but omit body for HEAD.
  return new NextResponse(null, { status: res.status, headers: res.headers });
}
