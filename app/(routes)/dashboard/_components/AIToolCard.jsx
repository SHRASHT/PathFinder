import { Button } from "../../../components/ui/button.jsx";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const AIToolCard = ({ tool, index }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 group">
      {" "}
      {/* Icon/Image Section */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {tool.icon && (
            <tool.icon size={32} className="text-blue-600 dark:text-blue-400" />
          )}
        </div>
      </div>
      {/* Content Section */}
      <div className="text-center space-y-3">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {tool.name}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed min-h-[3rem]">
          {tool.description}
        </p>

        {/* Action Button */}
        <div className="pt-2">
          <Link href={tool.path}>
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all cursor-pointer  duration-300 transform group-hover:scale-105"
              variant="default"
            >
              {tool.button}
            </Button>
          </Link>
        </div>
      </div>
      {/* Decorative element */}
      <div className="absolute top-3 right-3 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default AIToolCard;
