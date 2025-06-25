import React from "react";
import Sidebar from "../dashboard/components/Sidebar";

export default function BillingLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-100">
        {children}
      </div>
    </div>
  );
}
