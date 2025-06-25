// Simple Next.js API route for testing
export async function GET() {
  try {
    return Response.json({
      status: "success",
      message: "Basic API route is working",
      timestamp: new Date().toISOString(),
      url: "http://localhost:3000/api/test-basic",
    });
  } catch (error) {
    return Response.json(
      {
        status: "error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
