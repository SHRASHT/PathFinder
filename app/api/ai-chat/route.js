import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

// Direct Gemini model initialization
const geminiModel = google("gemini-2.5-flash", {
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

// System prompt for career guidance
const CAREER_SYSTEM_PROMPT = `You are PathFinder AI, an expert career advisor and mentor. Provide helpful, encouraging, and actionable career guidance.

Format your responses with:
- Clear headings with emojis (🚀, 💼, 🎯, etc.) - make the heading text bold but don't use ** symbols
- Well-structured sections using bold text and line breaks
- Bullet points with relevant emojis
- Use --- for section dividers
- Actionable tips and next steps
- Encouraging tone with personality

Structure your responses like this:

🎯 Main Topic/Answer (make this bold)
Your primary response here...

---

💡 Key Insights: (make this bold)
• Point 1 with emoji
• Point 2 with emoji  
• Point 3 with emoji

---

🚀 Action Steps: (make this bold)
1. First step
2. Second step
3. Third step

---

Always end with an engaging question to continue the conversation.

Keep responses concise but comprehensive, focusing on practical advice the user can implement immediately. Do NOT use ** for bold formatting - the system will handle bold text automatically.`;

export async function POST(request) {
  try {
    const { message, userId, sessionId } = await request.json();

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    console.log("🤖 Direct AI API call for:", message);    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json(
        {
          error: "GOOGLE_GENERATIVE_AI_API_KEY is not configured",
          fallback: true,
          response: `🔧 **AI Configuration Required**

I need the GOOGLE_GENERATIVE_AI_API_KEY to be properly configured to provide dynamic AI responses.

🎯 **Your Question:** "${message}"

💡 **Setup:** Please ensure your Google Generative AI API key is set in the .env.local file.`,
        },
        { status: 500 }
      );
    }

    console.log("✅ Using Gemini 2.5 Pro for direct response generation");    const { text } = await generateText({
      model: geminiModel,
      system: CAREER_SYSTEM_PROMPT,
      prompt: `User question: "${message}"

Please provide personalized career guidance for this question. Make your response visually appealing with emojis and formatting. Provide a complete, comprehensive answer.`,
      maxTokens: 2500,
      temperature: 0.7,
    });

    console.log("🎯 AI response generated successfully");
    return NextResponse.json({
      success: true,
      response: text,
      model: "gemini-2.5-flash",
      timestamp: new Date().toISOString(),
      userId,
      sessionId,
    });
  } catch (error) {
    console.error("❌ AI response generation failed:", error);

    return NextResponse.json(
      {
        error: error.message,
        fallback: true,
        response: `🚨 **AI Processing Error**

I encountered an issue while generating your response.

🔄 **Error:** ${error.message}

💡 **Suggestion:** Please try rephrasing your question or try again in a moment!`,
      },
      { status: 500 }
    );
  }
}
