import { inngest } from "../inngest/client";

// Utility functions to trigger Inngest events

export class InngestEventTrigger {
  // Trigger career assessment processing
  static async triggerCareerAssessment(userId, assessmentData) {
    try {
      const result = await inngest.send({
        name: "career/assessment.submitted",
        data: {
          userId,
          assessmentData,
          submittedAt: new Date().toISOString(),
        },
      });
      return { success: true, eventId: result.ids[0] };
    } catch (error) {
      console.error("Failed to trigger career assessment:", error);
      return { success: false, error: error.message };
    }
  }

  // Trigger AI chat message processing
  static async triggerAiChatMessage(userId, message, sessionId) {
    try {
      const result = await inngest.send({
        name: "chat/message.received",
        data: {
          userId,
          message,
          sessionId,
          timestamp: new Date().toISOString(),
        },
      });
      return { success: true, eventId: result.ids[0] };
    } catch (error) {
      console.error("Failed to trigger chat message:", error);
      return { success: false, error: error.message };
    }
  }

  // Trigger AI career query (direct AI interaction)
  static async triggerAiCareerQuery(userId, userInput, sessionId) {
    try {
      const result = await inngest.send({
        name: "ai/career.query",
        data: {
          userId,
          userInput,
          sessionId,
          timestamp: new Date().toISOString(),
        },
      });
      return { success: true, eventId: result.ids[0] };
    } catch (error) {
      console.error("Failed to trigger AI career query:", error);
      return { success: false, error: error.message };
    }
  }

  // Trigger resume analysis
  static async triggerResumeAnalysis(
    userId,
    resumeData,
    analysisType = "comprehensive"
  ) {
    try {
      const result = await inngest.send({
        name: "resume/analysis.requested",
        data: {
          userId,
          resumeData,
          analysisType,
          requestedAt: new Date().toISOString(),
        },
      });
      return { success: true, eventId: result.ids[0] };
    } catch (error) {
      console.error("Failed to trigger resume analysis:", error);
      return { success: false, error: error.message };
    }
  }

  // Trigger user onboarding
  static async triggerUserOnboarding(
    userId,
    userEmail,
    userName,
    signupSource = "direct"
  ) {
    try {
      const result = await inngest.send({
        name: "user/onboarded",
        data: {
          userId,
          userEmail,
          userName,
          signupSource,
          onboardedAt: new Date().toISOString(),
        },
      });
      return { success: true, eventId: result.ids[0] };
    } catch (error) {
      console.error("Failed to trigger user onboarding:", error);
      return { success: false, error: error.message };
    }
  }

  // Trigger test hello world event
  static async triggerHelloWorld(email) {
    try {
      const result = await inngest.send({
        name: "test/hello.world",
        data: {
          email,
        },
      });
      return { success: true, eventId: result.ids[0] };
    } catch (error) {
      console.error("Failed to trigger hello world:", error);
      return { success: false, error: error.message };
    }
  }

  // Batch trigger multiple events
  static async triggerBatch(events) {
    try {
      const results = await Promise.all(
        events.map((event) => inngest.send(event))
      );
      return {
        success: true,
        eventIds: results.map((result) => result.ids[0]),
        totalEvents: events.length,
      };
    } catch (error) {
      console.error("Failed to trigger batch events:", error);
      return { success: false, error: error.message };
    }
  }

  // Utility to check event status (placeholder - would need actual implementation)
  static async getEventStatus(eventId) {
    // This would typically query Inngest's API for event status
    // For now, returning a mock response
    return {
      eventId,
      status: "completed", // pending, running, completed, failed
      lastUpdated: new Date().toISOString(),
    };
  }
}

// Predefined event templates for common scenarios
export const EventTemplates = {
  // New user signup flow
  newUserSignup: (userId, email, name) => ({
    name: "user/onboarded",
    data: {
      userId,
      userEmail: email,
      userName: name,
      signupSource: "website",
      onboardedAt: new Date().toISOString(),
    },
  }),

  // Quick career assessment
  quickAssessment: (userId, responses) => ({
    name: "career/assessment.submitted",
    data: {
      userId,
      assessmentData: {
        type: "quick",
        responses,
        completedAt: new Date().toISOString(),
      },
      submittedAt: new Date().toISOString(),
    },
  }),

  // Emergency career chat
  urgentCareerQuery: (userId, message, priority = "high") => ({
    name: "chat/message.received",
    data: {
      userId,
      message,
      sessionId: `urgent_${Date.now()}`,
      priority,
      timestamp: new Date().toISOString(),
    },
  }),
};

// Example usage in your components:
/*
import { InngestEventTrigger, EventTemplates } from "@/lib/inngest-events";

// In your career assessment component
const handleAssessmentSubmit = async (assessmentData) => {
  const result = await InngestEventTrigger.triggerCareerAssessment(
    userId, 
    assessmentData
  );
  if (result.success) {
    console.log("Assessment processing started:", result.eventId);
  }
};

// In your chat component
const handleChatMessage = async (message) => {
  const result = await InngestEventTrigger.triggerAiChatMessage(
    userId, 
    message, 
    sessionId
  );
  if (result.success) {
    console.log("Chat message processing started:", result.eventId);
  }
};

// Using templates for new user signup
const handleNewUserSignup = async (user) => {
  const event = EventTemplates.newUserSignup(user.id, user.email, user.name);
  const result = await inngest.send(event);
};

// Batch processing multiple events
const handleMultipleActions = async () => {
  const events = [
    EventTemplates.newUserSignup("user1", "user1@example.com", "John"),
    EventTemplates.quickAssessment("user1", ["answer1", "answer2"])
  ];
  
  const result = await InngestEventTrigger.triggerBatch(events);
  console.log(`Processed ${result.totalEvents} events`);
};
*/
