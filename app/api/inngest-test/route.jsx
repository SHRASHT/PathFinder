import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { helloWorld } from "../../../inngest/functions";

// Simple test endpoint with just the hello world function
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld],
});
