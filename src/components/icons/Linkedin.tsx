import Image from "next/image";
import React from "react";

function Linkedin() {
  return (
    <>
      <Image
        src="/linkedin-white.svg"
        alt="LinkedIn Icon"
        width="16"
        height="16"
        className="hidden dark:block object-contain"
        draggable={false}
      />
      <Image
        src="/linkedin-dark.svg"
        alt="LinkedIn Icon"
        width="16"
        height="16"
        className="dark:hidden object-contain"
        draggable={false}
      />
    </>
  );
}

export default Linkedin;
