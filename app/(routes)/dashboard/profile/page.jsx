import React from "react";
import { UserProfile } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="p-5">
      <UserProfile className="mx-5 p-5" />
    </div>
  );
};

export default page;
