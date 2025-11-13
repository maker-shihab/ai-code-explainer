"use client";
import { AdvancedFilters } from "@/components/filters/advanced-filters";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ExplanationRequest, ExplanationResponse, FilterState } from "@/types";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("english");
  const [explanationStyle, setExplanationStyle] = useState("detailed");
  const [includeExamples, setIncludeExamples] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    programmingLanguage: "auto",
    explanationDepth: "intermediate",
    targetAudience: "developer",
  });

  const handleExplain = async () => {
    if (!code.trim()) return;

    setLoading(true);
    setExplanation("");

    const request: ExplanationRequest = {
      code,
      language: language as "english" | "bengali",
      explanationStyle: explanationStyle as "detailed" | "concise" | "beginner",
      includeExamples,
    };

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      const data: ExplanationResponse = await response.json();

      if (data.explanation) {
        setExplanation(data.explanation);
      } else {
        setExplanation(data.error || "Failed to generate explanation");
      }
    } catch {
      setExplanation("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const canExplain = code.trim() && !loading;

  const codeSnippets = [
    {
      title: "React useEffect",
      code: `useEffect(() => {\n  document.title = \`You clicked \${count} times\`;\n}, [count]);`,
      language: "javascript",
    },
    {
      title: "Python Function",
      code: `def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)`,
      language: "python",
    },
  ];

  const insertSnippet = (snippetCode: string) => {
    setCode(snippetCode);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              AI Code Explainer
            </h1>
            <p className="text-muted-foreground mt-2">
              Advanced code explanation powered by DeepSeek AI
            </p>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <span>By</span>
              <a
                href="https://github.com/maker-shihab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Muhammad Shihab Uddin
              </a>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Quick Start Snippets */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quick Start Examples</CardTitle>
            <CardDescription>
              Try these code snippets to see how it works
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {codeSnippets.map((snippet, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => insertSnippet(snippet.code)}
                >
                  {snippet.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Filters */}
        <AdvancedFilters
          filters={filters}
          onFiltersChange={setFilters}
          explanationStyle={explanationStyle}
          onExplanationStyleChange={setExplanationStyle}
          includeExamples={includeExamples}
          onIncludeExamplesChange={setIncludeExamples}
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-6">
          {/* Code Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Your Code</CardTitle>
              <CardDescription>
                Paste any code snippet you want to understand
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Paste your code here...\n// Or try one of the examples above"
                className="w-full h-80 p-4 border border-input rounded-lg font-mono text-sm focus:ring-2 focus:ring-ring focus:border-transparent resize-none bg-background"
                spellCheck="false"
              />

              <div className="flex gap-3">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
                >
                  <option value="english">English</option>
                  <option value="bengali">বাংলা</option>
                </select>

                <Button
                  onClick={handleExplain}
                  disabled={!canExplain}
                  className="flex-1"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Analyzing Code...
                    </>
                  ) : (
                    "Explain Code"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Explanation Output Section */}
          <Card>
            <CardHeader>
              <CardTitle>AI Explanation</CardTitle>
              <CardDescription>Powered by DeepSeek Coder AI</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-80">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">
                      AI is analyzing your code...
                    </p>
                  </div>
                </div>
              ) : explanation ? (
                <div className="h-80 overflow-y-auto">
                  <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                    {explanation}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-80 text-muted-foreground">
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 opacity-50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    <p>Explanation will appear here</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-muted-foreground text-sm">
          <p>
            Built with ❤️ by{" "}
            <a
              href="https://github.com/maker-shihab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Muhammad Shihab Uddin
            </a>{" "}
            • Next.js • TypeScript • Tailwind CSS • Shadcn/ui
          </p>
        </div>
      </div>
    </div>
  );
}
