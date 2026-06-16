"use client";

import { useEffect, useRef, useState } from "react";

type RuntimeStatus = "idle" | "booting" | "ready" | "error";

type WebContainerModule = typeof import("@webcontainer/api");
type XtermModule = typeof import("@xterm/xterm");
type FitAddonModule = typeof import("@xterm/addon-fit");
type WebContainerInstance = Awaited<ReturnType<WebContainerModule["WebContainer"]["boot"]>>;
type WebContainerProcess = Awaited<ReturnType<WebContainerInstance["spawn"]>>;
type TerminalInstance = InstanceType<XtermModule["Terminal"]>;
type FitAddonInstance = InstanceType<FitAddonModule["FitAddon"]>;

const appFiles = {
  "index.js": {
    file: {
      contents: `const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

const menuMakanan = {
  1: { nama: "Nasi Goreng", harga: 15000 },
  2: { nama: "Mie Ayam", harga: 12000 },
  3: { nama: "Ayam Goreng", harga: 18000 },
  4: { nama: "Es Teh Manis", harga: 5000 },
  5: { nama: "Air Mineral", harga: 3000 }
};

let keranjang = [];

function bersihkanLayar() {
  console.clear();
}

function tampilkanMenu() {
  console.log("========= MENU RESTO SENSASI =========");
  console.log("No   Nama Makanan         Harga");
  console.log("--------------------------------------");
  for (const nomor in menuMakanan) {
    const detail = menuMakanan[nomor];
    const nomorStr = nomor.toString().padEnd(4);
    const namaStr = detail.nama.padEnd(20);
    const hargaStr = \`Rp \${detail.harga.toLocaleString('id-ID')}\`;
    console.log(\`\${nomorStr} \${namaStr} \${hargaStr}\`);
  }
  console.log("======================================");
}

async function main() {
  const rl = readline.createInterface({ input, output });

  while (true) {
    bersihkanLayar();
    tampilkanMenu();

    const jawabanPilihan = await rl.question("\\nPilih nomor makanan yang ingin dipesan (0 untuk Selesai): ");
    const pilihan = parseInt(jawabanPilihan);

    if (isNaN(pilihan)) {
      await rl.question("Pilihan harus berupa angka! Tekan Enter untuk coba lagi...");
      continue;
    }

    if (pilihan === 0) {
      break;
    }

    if (menuMakanan[pilihan]) {
      const makananTerpilih = menuMakanan[pilihan];
      const jawabanJumlah = await rl.question(\`Mau beli berapa \${makananTerpilih.nama}? \`);
      const jumlah = parseInt(jawabanJumlah);

      if (isNaN(jumlah) || jumlah <= 0) {
        await rl.question("Jumlah harus berupa angka dan lebih dari 0! Tekan Enter...");
        continue;
      }

      const subtotal = makananTerpilih.harga * jumlah;
      keranjang.push({
        nama: makananTerpilih.nama,
        harga: makananTerpilih.harga,
        jumlah,
        subtotal
      });

      console.log(\`✓ Berhasil menambahkan \${jumlah} \${makananTerpilih.nama} ke keranjang.\`);
      await rl.question("\\nTekan Enter untuk lanjut memesan...");
    } else {
      await rl.question("Menu tidak ditemukan! Silakan pilih nomor yang tersedia. Tekan Enter...");
    }
  }

  bersihkanLayar();
  console.log("==============================================");
  console.log("               STRUK PEMBAYARAN                ");
  console.log("==============================================");

  if (keranjang.length === 0) {
    console.log("Anda tidak memesan makanan apa pun.");
  } else {
    let totalBayar = 0;
    console.log("Nama Makanan       Harga      Qty    Subtotal");
    console.log("----------------------------------------------");

    keranjang.forEach((item) => {
      const nama = item.nama.padEnd(18);
      const harga = item.harga.toString().padEnd(10);
      const qty = item.jumlah.toString().padEnd(6);
      const subtotal = \`Rp \${item.subtotal.toLocaleString('id-ID')}\`;

      console.log(\`\${nama} \${harga} \${qty} \${subtotal}\`);
      totalBayar += item.subtotal;
    });

    console.log("----------------------------------------------");
    console.log(\`TOTAL YANG HARUS DIBAYAR: Rp \${totalBayar.toLocaleString('id-ID')}\`);
    console.log("==============================================");
    console.log("        Terima Kasih Atas Kunjungan Anda!     ");
    console.log("==============================================");
  }

  rl.close();
}

main();`
    }
  }
} satisfies import("@webcontainer/api").FileSystemTree;

let webcontainerPromise: Promise<WebContainerInstance> | null = null;

async function getWebContainer(WebContainer: WebContainerModule["WebContainer"]) {
  if (!webcontainerPromise) {
    webcontainerPromise = WebContainer.boot({
      coep: "credentialless"
    });
  }

  return await webcontainerPromise;
}

export function WebContainerTerminal() {
  const terminalElementRef = useRef<HTMLDivElement | null>(null);
  const terminalRef = useRef<TerminalInstance | null>(null);
  const fitAddonRef = useRef<FitAddonInstance | null>(null);
  const processRef = useRef<WebContainerProcess | null>(null);
  const inputWriterRef = useRef<WritableStreamDefaultWriter<string> | null>(null);
  const resizeHandlerRef = useRef<(() => void) | null>(null);
  const initializedRef = useRef(false);
  const [status, setStatus] = useState<RuntimeStatus>("idle");
  const [statusMessage, setStatusMessage] = useState(
    "Memuat runtime Node.js di browser..."
  );
  const [isIsolated, setIsIsolated] = useState(false);

  useEffect(() => {
    let disposed = false;
    setIsIsolated(typeof window !== "undefined" && window.crossOriginIsolated);

    async function startRuntime() {
      if (!terminalElementRef.current || initializedRef.current) {
        return;
      }

      initializedRef.current = true;
      setStatus("booting");

      try {
        const [{ WebContainer }, { Terminal }, { FitAddon }] = await Promise.all([
          import("@webcontainer/api"),
          import("@xterm/xterm"),
          import("@xterm/addon-fit")
        ]);

        if (disposed || !terminalElementRef.current) {
          return;
        }

        const terminal = new Terminal({
          convertEol: true,
          cursorBlink: true,
          theme: {
            background: "#06101d",
            foreground: "#d8f3ff",
            cursor: "#8cf0c5",
            black: "#06101d",
            brightBlack: "#56708f",
            cyan: "#7ce7ff",
            green: "#8cf0c5",
            yellow: "#ffcf5d"
          }
        });
        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        terminal.open(terminalElementRef.current);
        fitAddon.fit();
        terminal.focus();

        terminalRef.current = terminal;
        fitAddonRef.current = fitAddon;

        const webcontainer = await getWebContainer(WebContainer);
        if (disposed) {
          terminal.dispose();
          return;
        }

        await webcontainer.mount(appFiles);

        const process = await webcontainer.spawn("node", ["index.js"], {
          terminal: {
            cols: terminal.cols,
            rows: terminal.rows
          }
        });

        processRef.current = process;

        process.output.pipeTo(
          new WritableStream({
            write(data) {
              terminal.write(data);
            }
          })
        ).catch(() => {});

        const inputWriter = process.input.getWriter();
        inputWriterRef.current = inputWriter;

        terminal.onData((data) => {
          inputWriter.write(data).catch(() => {});
        });

        const handleResize = () => {
          if (!fitAddonRef.current || !terminalRef.current || !processRef.current) {
            return;
          }

          fitAddonRef.current.fit();
          processRef.current.resize({
            cols: terminalRef.current.cols,
            rows: terminalRef.current.rows
          });
        };

        resizeHandlerRef.current = handleResize;
        window.addEventListener("resize", handleResize);

        process.exit.then(() => {
          if (!disposed) {
            setStatus("ready");
            setStatusMessage("Program selesai. Gunakan tombol restart untuk menjalankan lagi.");
          }
        }).catch(() => {});

        setStatus("ready");
        setStatusMessage("");
      } catch (error) {
        setStatus("error");
        setStatusMessage(
          error instanceof Error ? error.message : "WebContainer gagal dijalankan di browser ini."
        );
      }
    }

    startRuntime();

    return () => {
      disposed = true;
      resizeHandlerRef.current && window.removeEventListener("resize", resizeHandlerRef.current);
      inputWriterRef.current?.releaseLock();
      processRef.current?.kill();
      terminalRef.current?.dispose();
    };
  }, []);

  const disabled = status === "booting";

  return (
    <div className="webcontainer-card">
      <div className="webcontainer-card__header">
        <div>
          <span className="webcontainer-card__eyebrow">Project Preview</span>
        </div>
        <button
          className="terminal-preview__reset"
          disabled={disabled}
          onClick={() => window.location.reload()}
          type="button"
        >
          Restart
        </button>
      </div>
      <p className="webcontainer-card__note">
        {statusMessage}
      </p>
      {!isIsolated ? (
        <p className="webcontainer-card__warning">
          Browser belum cross-origin isolated. Hard refresh halaman jika runtime tidak muncul.
        </p>
      ) : null}
      <div className="webcontainer-card__terminal" ref={terminalElementRef} />
    </div>
  );
}
