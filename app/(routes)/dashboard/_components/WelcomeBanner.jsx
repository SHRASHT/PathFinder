import React from "react";
import { Button } from "../../../components/ui/button.jsx";
import AIToolCard from "./AIToolCard.jsx";
import AITools from "./AITools.jsx";
import History from "./History.jsx";

const WelcomeBanner = () => {
  return (
    <div>
      <div
        className="p-5 bg-blue-600 text-white rounded-md mt-6"
        style={{
          background: "linear-gradient(to top right, #2563eb, #9333ea)",
        }}
      >
        <h2 className="font-bold text-2xl mb-3">Welcome to AI Guide</h2>
        <p>
          Empowering you to discover your strengths, explore the best career
          paths, and make confident decisions— with personalized insights
          powered by AI, so your future unfolds with clarity and purpose.
        </p>
        <Button className="mt-5" variant={"outline"}>
          Get Started
        </Button>
      </div>
      <AITools />
      <History />
    </div>
  );
};

export default WelcomeBanner;
