import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FAQs() {
  const faqs = [
    {
      question: "What is LastMinPrep?",
      answer:
        "LastMinPrep is an AI-powered platform that helps you quickly prepare for coding interviews by generating personalized question sets based on your language, difficulty level, and job requirements.",
    },
    {
      question: "How does it work?",
      answer:
        "LastMinPrep works by taking your inputs—such as programming language, difficulty level, number of questions, and job description—and instantly generating tailored MCQs or coding challenges, then providing immediate feedback to help you improve.",
    },
    {
      question: "How does it help me improve?",
      answer:
        "LastMinPrep helps you improve by providing instant, detailed feedback on your answers, highlighting mistakes, explaining correct solutions, and offering targeted practice to strengthen your weak areas.",
    },
    {
      question: "Why use LastMinPrep instead of regular prep platforms?",
      answer:
        "LastMinPrep saves you time by generating customized, job-relevant questions instantly, focuses only on what you need to practice, and gives immediate, actionable feedback, unlike regular platforms that follow a one-size-fits-all approach.",
    },
  ];
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
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
            {faqs.map(({ question, answer }, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default FAQs;
