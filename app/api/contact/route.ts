import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please provide your name, email, and message." },
      { status: 400 },
    );
  }

  // Placeholder for integrating Formspree, email service, or other transport.
  await new Promise((resolve) => setTimeout(resolve, 400));

  return NextResponse.json({
    status: "ok",
    message:
      "Thanks for reaching out! I just received your note and will respond soon.",
  });
}
