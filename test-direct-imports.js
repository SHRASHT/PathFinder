// Direct test of Inngest function loading
console.log("🧪 Testing Inngest function imports...");

try {
  // Test client import
  console.log("📋 Loading Inngest client...");
  const { inngest } = require("./inngest/client.jsx");
  console.log("✅ Client loaded:", inngest.id);

  // Test functions import
  console.log("📋 Loading Inngest functions...");
  const functions = require("./inngest/functions.jsx");

  const expectedFunctions = [
    "helloWorld",
    "processCareerAssessment",
    "processAiChatMessage",
    "processResumeAnalysis",
    "processUserOnboarding",
    "AICareerAgent",
  ];

  console.log("📋 Checking function exports...");
  expectedFunctions.forEach((funcName) => {
    if (functions[funcName]) {
      console.log(`✅ Found: ${funcName}`);
    } else {
      console.log(`❌ Missing: ${funcName}`);
    }
  });

  console.log("📋 All exports:", Object.keys(functions));
  console.log("🎯 Test complete!");
} catch (error) {
  console.error("❌ Error loading functions:", error.message);
  console.error(error.stack);
}
