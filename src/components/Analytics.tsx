import { CheckCircle } from "lucide-react";
import React from "react";
import { DataImprovement } from "./DataImprovemnt";

function Analytics() {
  return (
    <section id="analytics" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Data-Driven Improvement
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Track how your performance evolves across attempts and stay
                focused on growth.
              </p>
            </div>
            <ul className="grid gap-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Progress tracked across multiple practice sessions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Visualize strengths and weak points by topic</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Understand time trends and consistency</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Get personalized insights to improve faster</span>
              </li>
            </ul>
          </div>
          <DataImprovement />
        </div>
      </div>
    </section>
  );
}

export default Analytics;
