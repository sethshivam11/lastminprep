import React from "react";
import Actions from "./Actions";

function CTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Join thousands of developers who have improved their interview
              skills with LastMinPrep
            </p>
          </div>
          <Actions />
        </div>
      </div>
    </section>
  );
}

export default CTA;
