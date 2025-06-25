"use client";
import React from "react";
import {
  Clock,
  FileText,
  MessageCircle,
  Map,
  FileSearch,
  Calendar,
} from "lucide-react";

const History = () => {
  const [userHistory, setUserHistory] = React.useState([]);

  // Mock data for demonstration - you can replace this with real data
  const mockHistory = [
    {
      id: 1,
      type: "AI Career Chat",
      title: "Career guidance session",
      description: "Discussed career transition from marketing to tech",
      date: "2024-01-15",
      time: "14:30",
      icon: MessageCircle,
      status: "completed",
    },
    {
      id: 2,
      type: "Resume Analyzer",
      title: "Resume analysis report",
      description: "Analyzed resume for software engineer position",
      date: "2024-01-14",
      time: "10:15",
      icon: FileSearch,
      status: "completed",
    },
  ];

  return (
    <div className="mt-5 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Recent History
        </h2>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
        Track your AI tool usage and view your past activities.
      </p>

      {userHistory?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          {/* Empty state illustration */}
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mb-4">
            <Clock className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No History Yet
          </h3>

          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm leading-relaxed">
            Your AI tool usage history will appear here. Start using our AI
            tools to see your activity timeline.
          </p>

          {/* Decorative elements */}
          <div className="flex space-x-2 mt-6 opacity-30">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {userHistory.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                {/* Icon */}
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {item.title}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </span>
                  </div>

                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
                    {item.type}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.time}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
