import Image from "next/image";
import React from "react";

function X() {
  return (
    <>
      <Image
        src="/x-white.svg"
        alt="X Icon"
        width="16"
        height="20"
        className="hidden dark:block object-contain select-none"
        draggable={false}
      />
      <Image
        src="/x-dark.svg"
        alt="X Icon"
        width="16"
        height="20"
        className="dark:hidden object-contain select-none"
        draggable={false}
      />
    </>
  );
}

export default X;
