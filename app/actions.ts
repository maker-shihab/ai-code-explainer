"use server";

type DeepSeekChatCompletion = {
  choices: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export async function explainCode(code: string): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return "DeepSeek API key is missing. Add it to .env.local.";
  }

  const payload = {
    model: "deepseek-coder",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful and expert code explainer. A user will provide a code snippet, and you will explain what it does in simple, easy-to-understand terms. Explain the 'why' behind the code, not just the 'what'.",
      },
      {
        role: "user",
        content: code,
      },
    ],
  };

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error("DeepSeek API error:", response.status, errorText);
      return "The DeepSeek API returned an error. Please try again later.";
    }

    const data = (await response.json()) as DeepSeekChatCompletion;
    const explanation = data?.choices?.[0]?.message?.content?.trim();

    if (!explanation) {
      return "The DeepSeek API did not return an explanation.";
    }

    return explanation;
  } catch (error) {
    console.error("Failed to fetch explanation from DeepSeek:", error);
    return "An unexpected error occurred while explaining the code.";
  }
}

