"use client";

import { FormEvent, useState } from "react";
import { explainCode } from "./actions";

export default function Home() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!code.trim()) {
      setExplanation("Please paste a code snippet to explain.");
      return;
    }

    setIsLoading(true);
    setExplanation("");

    try {
      const result = await explainCode(code);
      setExplanation(result);
    } catch (error) {
      console.error("Failed to explain code:", error);
      setExplanation("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center gap-10 px-6 py-12">
        <header className="space-y-2 text-center md:text-left">
          <h1 className="text-4xl font-semibold tracking-tight">
            AI Code Explainer
          </h1>
          <p className="text-slate-400">
            Paste any code snippet and receive a clear, human-friendly
            explanation.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded-2xl bg-slate-900/60 p-6 shadow-lg ring-1 ring-slate-800"
        >
          <label className="flex flex-col gap-3 text-sm font-medium text-slate-300">
            Code snippet
            <textarea
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Paste your code here..."
              className="h-48 w-full resize-y rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 font-mono text-sm text-slate-100 shadow-inner outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-500/50"
            />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-slate-500/60 disabled:text-slate-300"
          >
            {isLoading ? "Explaining..." : "Explain Code"}
          </button>
        </form>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-slate-200">Explanation</h2>
          <div className="mt-4 min-h-40 whitespace-pre-wrap rounded-xl bg-slate-950/60 p-4 text-sm text-slate-200 ring-1 ring-slate-800">
            {explanation || "Your explanation will appear here."}
          </div>
        </section>
      </main>
    </div>
  );
}
