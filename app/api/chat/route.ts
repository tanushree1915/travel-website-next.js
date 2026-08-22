import { NextResponse } from "next/server";
import knowledgeBase from "@/data/knowledge-base.json";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Turn the JSON cheat sheet into plain text Claude can read
    const context = JSON.stringify(knowledgeBase, null, 2);

    const systemPrompt = `You are the friendly support assistant for Travel Simba, a travel booking website.
Answer the visitor's question using ONLY the information in the knowledge base below.
If the answer isn't in the knowledge base, say you don't have that information and suggest they browse the site or contact support.
Keep answers short, warm, and helpful.

KNOWLEDGE BASE:
${context}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY as string,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        system: systemPrompt,
        messages: [{ role: "user", content: message }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      return NextResponse.json(
        { error: "Failed to get a response from the AI" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text ?? "Sorry, I couldn't come up with an answer.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}