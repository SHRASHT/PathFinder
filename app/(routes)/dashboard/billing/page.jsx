import React from "react";
import { PricingTable } from "@clerk/nextjs";

const BillingPage = () => {
  return (
    <div className="p-6 ">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-light text-gray-900 dark:text-white mb-2">
          Billing & Plans
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm font-light">
          Manage your subscription and billing details
        </p>
      </div>

      {/* Pricing Section */}
      <div className=" dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <PricingTable />
      </div>

      {/* Footer Note */}
      <div className="mt-6">
        <p className="text-xs text-gray-500 dark:text-gray-400 font-light">
          All plans include 14-day free trial • Cancel anytime
        </p>
      </div>
    </div>
  );
};

export default BillingPage;
