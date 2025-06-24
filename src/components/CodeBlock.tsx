"use client";

import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-sql"

function CodeBlock({ code, language }: { code: string; language: string }) {
  const decodedCode = code.replace(/\\n/g, "\n").replace(/\\"/g, '"');

  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, []);
  return (
    <div className="code-block">
      <pre suppressHydrationWarning>
        <code className={`language-${language}`} suppressHydrationWarning>
          {decodedCode}
        </code>
      </pre>
    </div>
  );
}

export default CodeBlock;
