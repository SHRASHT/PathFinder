import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";

// Minimal test function
const testHello = inngest.createFunction(
  { id: "test-hello" },
  { event: "test/hello" },
  async ({ event }) => {
    console.log("Test function called:", event.data);
    return { message: "Hello from test function!" };
  }
);

console.log("🔍 Creating minimal Inngest serve...");

// Minimal serve configuration
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [testHello],
});

console.log("✅ Minimal Inngest serve created successfully");
