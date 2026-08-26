import { groq } from "@/lib/groq";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  const completion = await groq.chat.completions.create({
    model: "qwen/qwen3-32b",

    messages: [
      {
        role: "system",
        content:
          "You are the AI assistant for Funinfate. Only answer using information provided by the website search results.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return NextResponse.json({
    response: completion.choices[0].message.content,
  });
}