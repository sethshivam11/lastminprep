import Image from "next/image";
import React from "react";

function Github() {
  return (
    <>
      <Image
        src="/github-white.svg"
        alt="GitHub Icon"
        width="16"
        height="16"
        className="hidden dark:block select-none"
        draggable={false}
      />
      <Image
        src="/github.svg"
        alt="GitHub Icon"
        width="16"
        height="16"
        className="dark:hidden select-none"
        draggable={false}
      />
    </>
  );
}

export default Github;
