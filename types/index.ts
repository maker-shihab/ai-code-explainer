export interface ExplanationRequest {
  code: string;
  language: "english" | "bengali";
  explanationStyle: "detailed" | "concise" | "beginner";
  includeExamples: boolean;
}

export interface ExplanationResponse {
  explanation: string;
  error?: string;
}

export interface CodeSnippet {
  id: string;
  title: string;
  code: string;
  language: string;
}

export interface FilterState {
  programmingLanguage: string;
  explanationDepth: "basic" | "intermediate" | "advanced";
  targetAudience: "student" | "developer" | "senior";
}

export interface DeepSeekMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface DeepSeekRequest {
  model: string;
  messages: DeepSeekMessage[];
  max_tokens?: number;
  temperature?: number;
  stream?: boolean;
}
