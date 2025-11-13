import { DeepSeekService } from "@/lib/deepseek";
import { ExplanationRequest, ExplanationResponse } from "@/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body: ExplanationRequest = await request.json();
    const { code, language, explanationStyle, includeExamples } = body;

    if (!code?.trim()) {
      const errorResponse: ExplanationResponse = {
        explanation: "",
        error: "Code input is required",
      };
      return Response.json(errorResponse, { status: 400 });
    }

    const deepSeekService = new DeepSeekService();
    const explanation = await deepSeekService.explainCode({
      code,
      language,
      explanationStyle,
      includeExamples,
    });

    const response: ExplanationResponse = { explanation };
    return Response.json(response);
  } catch (error) {
    console.error("Explanation error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    const response: ExplanationResponse = {
      explanation: "",
      error: `Failed to generate explanation: ${errorMessage}`,
    };

    return Response.json(response, { status: 500 });
  }
}
