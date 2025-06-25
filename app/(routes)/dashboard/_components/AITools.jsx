import React from "react";
import AIToolCard from "./AIToolCard";
import { MessageCircle, Map, FileText, FileSearch } from "lucide-react";

const AIToolsList = [
  {
    id: "tool1",
    name: "AI Career Chat",
    description: "Get help with your tasks using AI.",
    button: "Lets chat",
    path: "/ai-tools/ai-chat",
    icon: MessageCircle,
  },
  {
    id: "tool2",
    name: "Career Roadmap Generator",
    description: "Build your Roadmap to success with AI.",
    button: "Generate Roadmap",
    path: "/roadmap-build",
    icon: Map,
  },
  {
    id: "tool3",
    name: "Cover Letter Generator",
    description: "Build your Cover Letter with AI.",
    button: "Generate Now",
    path: "/cover-letter",
    icon: FileText,
  },
  {
    id: "tool4",
    name: "Resume Analyzer",
    description: "Get your Resume analyzed by AI.",
    button: "Analyze Now",
    path: "/resume-analyzer",
    icon: FileSearch,
  },
];

const AITools = () => {
  return (
    <div className="mt-7 p-5   rounded-xl ">
      <h2 className="font-bold text-lg">AI Tools</h2>
      <p className="text-gray-500 text-sm mb-4">
        Explore our AI tools to enhance your career journey.
      </p>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {AIToolsList.map((tool, index) => (
          <AIToolCard tool={tool} key={index} />
        ))}
      </div>
    </div>
  );
};

export default AITools;
