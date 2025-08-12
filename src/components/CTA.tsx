import React from "react";
import Actions from "./Actions";

function CTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Ready to Ace Your Next
              <span className="bg-gradient-to-t bg-clip-text text-transparent from-[#06B6D4] to-[#3B82F6] dark:from-[#2DD4BF] dark:to-[#06B6D4]">
                &nbsp;Interview?
              </span>
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Get tailored practice to boost your interview confidence with
              LastMinPrep
            </p>
          </div>
          <Actions />
        </div>
      </div>
    </section>
  );
}

export default CTA;
