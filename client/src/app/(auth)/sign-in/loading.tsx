import SkeletonPage from "@/components/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="px-10">
      <SkeletonPage></SkeletonPage>
    </div>
  );
};

export default loading;
