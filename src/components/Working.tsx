import { Cpu, MessageSquare, Target } from "lucide-react";
import React from "react";

function Working() {
  const steps = [
    {
      icon: MessageSquare,
      iconClasses: "text-blue-500",
      iconBackground:
        "bg-blue-100 dark:bg-blue-950 border-blue-200 dark:border-blue-900 group-hover:border-blue-500 dark:group-hover:border-blue-500",
      title: "Tell Us What You Need",
      description:
        "Choose your programming language, difficulty level, number of MCQs or coding questions, and share your job description or any extra details.",
    },
    {
      icon: Cpu,
      iconClasses: "text-emerald-500",
      iconBackground:
        "bg-emerald-100 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-900 group-hover:border-emerald-500 dark:group-hover:border-emerald-500",
      title: "Get AI-Generated Questions",
      description:
        "Our AI instantly creates tailored interview questions based on your inputs, simulating real interview conditions.",
    },
    {
      icon: Target,
      iconClasses: "text-rose-500",
      iconBackground:
        "bg-rose-100 dark:bg-rose-950 border-rose-200  dark:border-rose-900 group-hover:border-rose-500 dark:group-hover:border-rose-500",
      title: "Practice & Get Feedback",
      description:
        "Solve the questions, receive instant AI feedback, and learn how to improve your solutions quickly.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
    >
      <div className="px-4 md:px-6">
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
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={index} className="text-center group">
                <div
                  className={`w-20 h-20 border-2 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300 ${step.iconBackground}`}
                >
                  <Icon className={`w-10 h-10 ${step.iconClasses}`} />
                </div>

                <div className="text-4xl font-extrabold text-primary/20 mb-4 tracking-tighter">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="text-2xl font-semibold tracking-tight mb-4 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Working;
