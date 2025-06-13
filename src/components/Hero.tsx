import React from "react";
import CodeBlock from "@/components/CodeBlock";
import Actions from "./Actions";

function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Ace Your Coding Interviews with AI-Powered Practice
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Prepare for technical interviews with AI-generated coding
                questions and get instant feedback on your solutions.{" "}
              </p>
            </div>
            <Actions />
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full rounded-lg overflow-hidden bg-muted p-3 font-mono text-sm">
              <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                <div className="flex space-x-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs">welcome.js</span>
              </div>
              <CodeBlock
                code={`// Welcome to LastMinPrep!
function greetDeveloper(name) {
  console.log(\`Hello, \${name}!\`);
  
  const topics = ["Arrays", "Strings", "Trees"];
  
  // Practice these key areas
  topics.forEach((topic) => {
    console.log(\`- \${topic}\`);
  });
  
  return "You&apos;ve got this! 💪";
}`}
                language="javascript"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
