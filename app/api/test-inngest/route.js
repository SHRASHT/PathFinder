import { NextResponse } from "next/server";
import { inngest } from "../../../inngest/client.jsx";

export async function POST() {
  try {
    console.log("🧪 Testing Inngest client...");

    // Test sending a simple event
    const result = await inngest.send({
      name: "test/hello.world",
      data: {
        email: "test@example.com",
        timestamp: new Date().toISOString(),
      },
    });

    console.log("✅ Inngest event sent successfully!", result);

    return NextResponse.json({
      success: true,
      message: "Inngest test event sent successfully",
      eventId: result.ids[0],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Inngest test failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: "Failed to send test event",
        troubleshooting: {
          checkInngentServer:
            "Make sure 'npx inngest-cli@latest dev' is running",
          checkNextjsApp: "Make sure your Next.js app is running",
          checkEnvironment: "Verify environment variables are loaded",
        },
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Inngest Test Endpoint",
    instructions: "Send POST request to test Inngest connection",
    inngestDashboard: "http://localhost:8288",
  });
}
