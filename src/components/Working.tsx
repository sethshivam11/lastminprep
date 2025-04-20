import React from "react";

function Working() {
  return (
    <section
      id="how-it-works"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/70"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              How It Works
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Simple steps to improve your interview skills
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-8">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-secondary font-bold tracking-tight">
              1
            </div>
            <h3 className="text-xl font-bold">Sign Up</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Create your account and select your target companies or roles
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-secondary font-bold tracking-tight">
              2
            </div>
            <h3 className="text-xl font-bold">Take Tests</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Complete AI-generated MCQs and coding challenges
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-secondary font-bold tracking-tight">
              3
            </div>
            <h3 className="text-xl font-bold">Improve</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Review feedback and analytics to focus your practice
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Working;
