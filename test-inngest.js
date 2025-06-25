// Simple test script to verify Inngest setup
import { inngest } from "./inngest/client.jsx";

async function testInngestConnection() {
  console.log("🧪 Testing Inngest connection...");
  console.log("Client configured:", inngest ? "✅" : "❌");

  try {
    // Test sending a simple event
    const result = await inngest.send({
      name: "test/hello.world",
      data: {
        email: "test@example.com",
      },
    });

    console.log("✅ Inngest event sent successfully!");
    console.log("Event ID:", result.ids[0]);
  } catch (error) {
    console.log("❌ Inngest connection failed:");
    console.log("Error:", error.message);
    console.log("Full error:", error);
    console.log("\n💡 Troubleshooting tips:");
    console.log(
      "1. Make sure Inngest dev server is running: npx inngest-cli@latest dev"
    );
    console.log(
      "2. Check your .env.local file has the correct INNGEST_SIGNING_KEY"
    );
    console.log(
      "3. Verify your Next.js app is running on http://localhost:3000"
    );
  }
}

testInngestConnection().catch(console.error);
