import GeneratingAnimation from "@/components/GeneratingAnimation";
import React from "react";

function page() {
  return (
    <GeneratingAnimation
      language="javascript"
      difficulty="easy"
      mcqCount={5}
      codingCount={0}
    />
  );
}

export default page;
