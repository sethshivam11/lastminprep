"use client";

import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";

function CodeBlock({ code, language }: { code: string; language: string }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, []);
  return (
    <div className="code-block">
      <pre suppressHydrationWarning>
        <code className={`language-${language}`} suppressHydrationWarning>
          {code}
        </code>
      </pre>
    </div>
  );
}

export default CodeBlock;
