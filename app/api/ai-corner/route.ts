import profile from "@/data/profile.json";
import { NextResponse } from "next/server";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ChatRequest = {
  messages?: ChatMessage[];
};

const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";

export async function POST(request: Request) {
  const body = (await request.json()) as ChatRequest;
  const { messages } = body;

  if (!messages || messages.length === 0) {
    return NextResponse.json(
      { error: "Please supply at least one message." },
      { status: 400 },
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Missing OPENAI_API_KEY. Add it to your environment to enable the AI Corner assistant.",
      },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(OPENAI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        max_tokens: 600,
        temperature: 0.6,
        messages: [
          {
            role: "system",
            content: [
              `You are the AI Corner assistant for ${profile.name}.`,
              "Use the following context when answering questions:",
              JSON.stringify(profile, null, 2),
            ].join("\n\n"),
          },
          ...messages.slice(-10),
        ],
      }),
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error:
            errorPayload.error?.message ??
            "The AI service returned an error. Please try again shortly.",
        },
        { status: 500 },
      );
    }

    const completion = await response.json();
    const message =
      completion?.choices?.[0]?.message?.content ??
      "I couldn't craft a response just now, but I'm here if you'd like to try again.";

    return NextResponse.json({ message });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unexpected error while contacting the AI service.",
      },
      { status: 500 },
    );
  }
}
