"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AiChatRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    // Generate a new UUID and redirect to the dynamic chat page
    const newChatId = uuidv4();
    router.replace(`/ai-tools/ai-chat/${newChatId}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
        <p className="text-gray-600">Starting new chat session...</p>
      </div>
    </div>
  );
};

export default AiChatRedirect;
