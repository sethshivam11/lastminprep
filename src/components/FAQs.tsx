import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

function FAQs() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Everything you need to know about LastMinPrep
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl mt-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is LastMinPrep?</AccordionTrigger>
              <AccordionContent>
                LastMinPrep is a focused preparation platform designed to help
                you revise key concepts and practice important topics right
                before your tech interviews — fast, smart, and effectively.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How does it work?</AccordionTrigger>
              <AccordionContent>
                We give you targeted problem sets, timed quizzes, and
                performance insights so you can focus on the areas that matter
                most in the shortest time possible. It&apos;s like a crash course
                tailored to your weak points.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How does it help me improve?</AccordionTrigger>
              <AccordionContent>
                Our system tracks your performance across attempts, pinpoints
                weak areas, and compares your progress with industry benchmarks
                — so you can prep smarter, not harder.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Why use LastMinPrep instead of regular prep platforms?
              </AccordionTrigger>
              <AccordionContent>
                Traditional platforms are great for long-term learning. But
                LastMinPrep is built for revision-mode — when you need quick
                feedback, smart targeting, and results under pressure.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default FAQs;
