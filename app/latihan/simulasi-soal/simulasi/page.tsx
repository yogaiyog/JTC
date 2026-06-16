import { QuestionSimulationCard } from "@/components/question-simulation-card";
import { SiteHeader } from "@/components/site-header";
import { questionLevels } from "@/lib/training-content";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickString(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function SimulasiSoalPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const levelId = pickString(params.level);
  const questionId = pickString(params.question);
  const submitUrlParam = pickString(params.submitUrl);
  const startedAtParam = Number(pickString(params.startedAt));

  const level = questionLevels.find((item) => item.id === levelId) ?? questionLevels[0];
  const question = level.questions.find((item) => item.id === questionId) ?? level.questions[0];
  const startedAt =
    Number.isFinite(startedAtParam) && startedAtParam > 0 ? startedAtParam : Date.now();
  const initialNow = Date.now();
  const submitUrl =
    submitUrlParam ??
    process.env.NEXT_PUBLIC_SIMULATION_SUBMIT_FORM_URL ??
    process.env.NEXT_PUBLIC_REGISTRATION_URL ??
    "https://docs.google.com/forms/";

  return (
    <main className="shell">
      <SiteHeader
        brandHref="/latihan/simulasi-soal"
        links={[
          { href: "/latihan/simulasi-soal", label: "Pilih Kategori" },
          { href: "/soal", label: "Soal" }
        ]}
      />

      <section className="section training-hero">
        <div className="container question-simulation">
          <QuestionSimulationCard
            levelLabel={level.label}
            levelAge={level.age}
            question={question}
            startedAt={startedAt}
            initialNow={initialNow}
            submitUrl={submitUrl}
          />
        </div>
      </section>
    </main>
  );
}
