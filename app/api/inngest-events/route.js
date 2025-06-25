import { NextResponse } from "next/server";
import {
  InngestEventTrigger,
  EventTemplates,
} from "../../../lib/inngest-events";

export async function POST(request) {
  try {
    const { type, data, batch = false } = await request.json();

    let result;

    // Handle batch processing
    if (batch && Array.isArray(data)) {
      const events = data
        .map((item) => {
          switch (item.type) {
            case "hello":
              return {
                name: "test/hello.world",
                data: { email: item.data.email },
              };
            case "career-assessment":
              return EventTemplates.quickAssessment(
                item.data.userId,
                item.data.responses
              );
            case "user-onboarding":
              return EventTemplates.newUserSignup(
                item.data.userId,
                item.data.userEmail,
                item.data.userName
              );
            default:
              return null;
          }
        })
        .filter(Boolean);

      result = await InngestEventTrigger.triggerBatch(events);

      return NextResponse.json({
        success: result.success,
        eventIds: result.eventIds,
        totalEvents: result.totalEvents,
        message: result.success
          ? "Batch events triggered successfully"
          : "Failed to trigger batch events",
        error: result.error || null,
      });
    }

    // Handle individual events
    switch (type) {
      case "hello":
        result = await InngestEventTrigger.triggerHelloWorld(data.email);
        break;

      case "career-assessment":
        result = await InngestEventTrigger.triggerCareerAssessment(
          data.userId,
          data.assessmentData
        );
        break;

      case "chat-message":
        result = await InngestEventTrigger.triggerAiChatMessage(
          data.userId,
          data.message,
          data.sessionId
        );
        break;

      case "ai-career-query":
        result = await InngestEventTrigger.triggerAiCareerQuery(
          data.userId,
          data.userInput,
          data.sessionId
        );
        break;

      case "resume-analysis":
        result = await InngestEventTrigger.triggerResumeAnalysis(
          data.userId,
          data.resumeData,
          data.analysisType || "comprehensive"
        );
        break;

      case "user-onboarding":
        result = await InngestEventTrigger.triggerUserOnboarding(
          data.userId,
          data.userEmail,
          data.userName,
          data.signupSource
        );
        break;

      default:
        return NextResponse.json(
          {
            error: "Invalid event type",
            availableTypes: [
              "hello",
              "career-assessment",
              "chat-message",
              "ai-career-query",
              "resume-analysis",
              "user-onboarding",
            ],
          },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: result.success,
      eventId: result.eventId,
      message: result.success
        ? "Event triggered successfully"
        : "Failed to trigger event",
      error: result.error || null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

// GET endpoint to test if the API is working and get event status
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get("eventId");

  // If eventId is provided, return event status
  if (eventId) {
    const status = await InngestEventTrigger.getEventStatus(eventId);
    return NextResponse.json({
      eventId,
      status: status.status,
      lastUpdated: status.lastUpdated,
    });
  }

  // Otherwise return API info
  return NextResponse.json({
    message: "Inngest Events API is running",
    version: "2.0",
    endpoints: {
      POST: "Trigger events",
      GET: "Get API status or event status (with ?eventId=xxx)",
    },
    availableEvents: [
      {
        type: "hello",
        description: "Test event",
        requiredData: ["email"],
      },
      {
        type: "career-assessment",
        description: "Process career assessment",
        requiredData: ["userId", "assessmentData"],
      },
      {
        type: "chat-message",
        description: "Process AI chat message",
        requiredData: ["userId", "message", "sessionId"],
      },
      {
        type: "ai-career-query",
        description: "Direct AI career consultation",
        requiredData: ["userId", "userInput", "sessionId"],
      },
      {
        type: "resume-analysis",
        description: "Analyze resume",
        requiredData: ["userId", "resumeData"],
        optionalData: ["analysisType"],
      },
      {
        type: "user-onboarding",
        description: "Process new user onboarding",
        requiredData: ["userId", "userEmail", "userName"],
        optionalData: ["signupSource"],
      },
    ],
    batchProcessing: {
      enabled: true,
      description: "Send batch=true with array of events in data field",
    },
  });
}
