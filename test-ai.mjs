// Test script to verify Gemini AI integration
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const geminiModel = google("gemini-2.5-flash", {
  apiKey: process.env.GEMINI_API_KEY,
});

const CAREER_SYSTEM_PROMPT = `You are PathFinder AI, an expert career advisor and mentor. Provide helpful, encouraging, and actionable career guidance.

Format your responses with emojis, clear sections, and visual elements like boxes made with Unicode characters (┌─┐ │ └─┘). Make your advice practical and specific.

Structure your responses with:
- Clear headings with emojis (🚀, 💼, 🎯, etc.)
- Organized sections in boxes using ┌─────┐ │ content │ └─────┘
- Bullet points with relevant emojis
- Actionable tips and next steps
- Encouraging tone with personality

Always end with an engaging question to continue the conversation.

Keep responses concise but comprehensive, focusing on practical advice the user can implement immediately.`;

async function testAI() {
  try {
    console.log("🧪 Testing Gemini AI integration...");
    console.log("🔑 API Key available:", !!process.env.GEMINI_API_KEY);

    const { text } = await generateText({
      model: geminiModel,
      system: CAREER_SYSTEM_PROMPT,
      prompt: `User question: "What skills should I develop for a career in software engineering?"

Please provide personalized career guidance for this question. Make your response visually appealing with emojis and formatting.`,
      maxTokens: 800,
      temperature: 0.7,
    });

    console.log("✅ AI Response Generated:");
    console.log("=".repeat(60));
    console.log(text);
    console.log("=".repeat(60));
    console.log("🎉 Test completed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.error("💡 Make sure GEMINI_API_KEY is properly set in .env.local");
  }
}

testAI();
