import { DeepSeekRequest, ExplanationRequest } from "@/types";

export class DeepSeekService {
  private apiKey: string;
  private baseURL = "https://api.deepseek.com/v1/chat/completions";

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY!;
    if (!this.apiKey) {
      throw new Error("DEEPSEEK_API_KEY is not set in environment variables");
    }
  }

  private createPrompt(request: ExplanationRequest): string {
    const { code, language, explanationStyle, includeExamples } = request;

    const styleMap = {
      detailed: "comprehensive and detailed",
      concise: "brief and to the point",
      beginner: "very simple and easy to understand for beginners",
    };

    const languageMap = {
      english: "English",
      bengali: "Bengali",
    };

    const examplesText = includeExamples
      ? "Include practical examples where relevant. "
      : "";

    return `You are an expert programming educator. Explain this code in ${languageMap[language]} in a ${styleMap[explanationStyle]} manner.

${code}

${examplesText}Please structure your explanation with:
1. Overall purpose and functionality
2. Key components and their roles
3. Step-by-step execution flow
4. Important concepts and patterns

Keep it educational and practical.`;
  }

  async explainCode(request: ExplanationRequest): Promise<string> {
    const prompt = this.createPrompt(request);

    const deepSeekRequest: DeepSeekRequest = {
      model: "deepseek-coder",
      messages: [
        {
          role: "system",
          content:
            "You are a patient and clear programming instructor. Break down complex concepts into understandable parts.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    };

    const response = await fetch(this.baseURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deepSeekRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API error:", errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid response format from DeepSeek API");
    }

    return data.choices[0].message.content;
  }
}
