import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client.js";
import {
  helloWorld,
  processCareerAssessment,
  processAiChatMessage,
  processResumeAnalysis,
  processUserOnboarding,
} from "../../../inngest/functions.js";

// Export the handlers with all functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
    processCareerAssessment,
    processAiChatMessage,
    processResumeAnalysis,
    processUserOnboarding,
  ],
});
