"use client";

import { useMemo, useState } from "react";

type TerminalStep = {
  prompt: string;
  expectedInput: string;
  output: string[];
};

type TerminalPreviewProps = {
  title: string;
  introLines: string[];
  steps: TerminalStep[];
};

function normalizeInput(value: string) {
  return value.trim().toLowerCase();
}

export function TerminalPreview({
  title,
  introLines,
  steps
}: TerminalPreviewProps) {
  const [history, setHistory] = useState<string[]>(introLines);
  const [stepIndex, setStepIndex] = useState(0);
  const [input, setInput] = useState("");

  const currentStep = steps[stepIndex];
  const isFinished = stepIndex >= steps.length;

  const promptLabel = useMemo(() => {
    if (isFinished) {
      return "simulasi@jtc:~$";
    }

    return currentStep.prompt;
  }, [currentStep, isFinished]);

  function resetTerminal() {
    setHistory(introLines);
    setStepIndex(0);
    setInput("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isFinished) {
      resetTerminal();
      return;
    }

    const typed = input.trim();
    if (!typed) {
      return;
    }

    const nextHistory = [...history, `${currentStep.prompt} ${typed}`];

    if (normalizeInput(typed) === normalizeInput(currentStep.expectedInput)) {
      setHistory([...nextHistory, ...currentStep.output]);
      setStepIndex((value) => value + 1);
      setInput("");
      return;
    }

    setHistory([
      ...nextHistory,
      `Input tidak sesuai. Coba jawab: ${currentStep.expectedInput}`
    ]);
    setInput("");
  }

  return (
    <div className="terminal-preview">
      <div className="terminal-preview__top">
        <div className="terminal-preview__lights" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <strong>{title}</strong>
        <button className="terminal-preview__reset" type="button" onClick={resetTerminal}>
          Reset
        </button>
      </div>

      <div className="terminal-preview__body">
        {history.map((line, index) => (
          <div className="terminal-preview__line" key={`${line}-${index}`}>
            {line}
          </div>
        ))}

        <form className="terminal-preview__form" onSubmit={handleSubmit}>
          <label className="terminal-preview__prompt">
            <span>{promptLabel}</span>
            <input
              autoComplete="off"
              className="terminal-preview__input"
              disabled={isFinished}
              onChange={(event) => setInput(event.target.value)}
              placeholder={isFinished ? "Simulasi selesai, tekan Reset" : "Ketik jawaban di sini"}
              value={input}
            />
          </label>
        </form>
      </div>
    </div>
  );
}
