import React from "react";
import Sidebar from "./dashboard/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div>
      {/* Dashboard-specific layout content */}
      <nav>{/* Add dashboard navigation here if needed */}</nav>
      {/* <Sidebar /> */}
      <main>{children}</main>
    </div>
  );
}
