import { NextResponse } from "next/server";

// Simple test endpoint to check if Inngest API is accessible
export async function GET() {
  try {
    // Test if we can reach the Inngest dev server
    const response = await fetch("http://localhost:8288/dev", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: "Inngest dev server is accessible",
        status: response.status,
        inngestDashboard: "http://localhost:8288",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Inngest dev server not accessible",
        status: response.status,
        suggestion: "Make sure to run: npx inngest-cli@latest dev",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Cannot connect to Inngest dev server",
      error: error.message,
      suggestion: "Start Inngest dev server first: npx inngest-cli@latest dev",
    });
  }
}

export async function POST() {
  return NextResponse.json({
    message: "Use GET method to test Inngest connection",
  });
}
