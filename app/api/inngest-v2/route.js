import { serve } from "inngest/next";
import { Inngest } from "inngest";

// Create client directly in route
const inngest = new Inngest({
  id: "career-app",
  name: "Career Recommendation App",
});

// Simple function
const testFunction = inngest.createFunction(
  { id: "test" },
  { event: "test/ping" },
  async ({ event }) => {
    return {
      message: "pong",
      timestamp: new Date().toISOString(),
    };
  }
);

// Export handlers
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [testFunction],
});
