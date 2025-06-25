import React from "react";
import { PricingTable } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="p-8 min-h-full">
      <div className="max-w-2xl mx-auto">
        {/* Simple Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-light text-gray-900 dark:text-white mb-2">
            Plans
          </h1>
          <p className="text-gray-500 text-base">Simple, transparent pricing</p>
        </div>

        {/* Clean Pricing Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <PricingTable />
        </div>

        {/* Minimal Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Cancel anytime • No hidden fees
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
