"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Code,
  BarChart3,
  Brain,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ModeToggle } from "@/components/ModeToggle";
import CodeBlock from "@/components/CodeBlock";
import Image from "next/image";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link
            className="flex items-center justify-center gap-2 mr-4"
            href="#"
          >
            <Image src="/logo.svg" alt="Logo" width="30" height="30" />
            <span className="font-extrabold tracking-tighter text-xl">
              LastMinPrep
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              className="transition-colors hover:text-foreground/80"
              href="#features"
            >
              Features
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80"
              href="#technologies"
            >
              Technologies
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80"
              href="#how-it-works"
            >
              How It Works
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80"
              href="#analytics"
            >
              Analytics
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80"
              href="#faq"
            >
              FAQ
            </Link>
          </nav>

          <div className="flex items-center justify-end space-x-4">
            <ModeToggle />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container py-4 grid gap-3">
              <Link
                className="flex items-center py-2 text-foreground hover:text-foreground/80"
                href="#features"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                className="flex items-center py-2 text-foreground hover:text-foreground/80"
                href="#technologies"
                onClick={() => setIsMenuOpen(false)}
              >
                Technologies
              </Link>
              <Link
                className="flex items-center py-2 text-foreground hover:text-foreground/80"
                href="#how-it-works"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                className="flex items-center py-2 text-foreground hover:text-foreground/80"
                href="#analytics"
                onClick={() => setIsMenuOpen(false)}
              >
                Analytics
              </Link>
              <Link
                className="flex items-center py-2 text-foreground hover:text-foreground/80"
                href="#faq"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
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
                    <span className="font-bold">
                      100% Free during our launch period!
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
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

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Features
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to prepare for your next coding interview
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <Card>
                <CardHeader>
                  <Brain className="h-10 w-10 mb-2" />
                  <CardTitle>AI-Generated Questions</CardTitle>
                  <CardDescription>
                    Practice with unique MCQs and coding challenges generated by
                    AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our AI creates questions that match real interview patterns
                    from top tech companies.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Code className="h-10 w-10 mb-2" />
                  <CardTitle>Instant Evaluation</CardTitle>
                  <CardDescription>
                    Get immediate feedback on your code solutions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our AI evaluates your code for correctness, efficiency, and
                    best practices in real-time.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart3 className="h-10 w-10 mb-2" />
                  <CardTitle>Performance Insights</CardTitle>
                  <CardDescription>
                    Track your progress with detailed analytics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Visualize your strengths and weaknesses across different
                    topics and question types.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Technologies Covered Section */}
        <section id="technologies" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Technologies Covered
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Practice with questions across popular programming languages
                  and topics
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl mt-8">
              <Tabs defaultValue="languages" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="languages">Languages</TabsTrigger>
                  <TabsTrigger value="topics">Topics</TabsTrigger>
                  <TabsTrigger value="concepts">Concepts</TabsTrigger>
                </TabsList>
                <TabsContent value="languages" className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">🐍</div>
                      <span>Python</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">☕</div>
                      <span>Java</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">🟨</div>
                      <span>JavaScript</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">🧠</div>
                      <span>C++</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">⚙️</div>
                      <span>C</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">🗄️</div>
                      <span>SQL</span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="topics" className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">📊</div>
                      <span>Arrays</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">📝</div>
                      <span>Strings</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">🔗</div>
                      <span>Linked Lists</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">🌲</div>
                      <span>Trees</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">📊</div>
                      <span>Graphs</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">📚</div>
                      <span>Stacks</span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="concepts" className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">🧩</div>
                      <span>Algorithms</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">🌲</div>
                      <span>Data Structures</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">⏱️</div>
                      <span>Time Complexity</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">📏</div>
                      <span>Space Complexity</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">🧠</div>
                      <span>Problem Solving</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">🔄</div>
                      <span>Dynamic Programming</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
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

        {/* Analytics Showcase */}
        <section id="analytics" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Data-Driven Improvement
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Track your progress and identify areas for improvement with
                    detailed analytics
                  </p>
                </div>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Topic-wise performance breakdown</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Time analysis for each question type</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Comparison with industry benchmarks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Personalized improvement recommendations</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden bg-white dark:bg-gray-950 p-4">
                  <div className="h-full flex flex-col">
                    <div className="text-sm font-medium mb-4">
                      Your Performance Analytics
                    </div>
                    <div className="flex-1 flex items-end gap-2">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-12 bg-primary rounded-t-md"
                          style={{ height: "30%" }}
                        ></div>
                        <div className="mt-2 text-xs">Arrays</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className="w-12 bg-primary rounded-t-md"
                          style={{ height: "65%" }}
                        ></div>
                        <div className="mt-2 text-xs">Strings</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className="w-12 bg-primary rounded-t-md"
                          style={{ height: "45%" }}
                        ></div>
                        <div className="mt-2 text-xs">Trees</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className="w-12 bg-primary rounded-t-md"
                          style={{ height: "80%" }}
                        ></div>
                        <div className="mt-2 text-xs">Sorting</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className="w-12 bg-primary rounded-t-md"
                          style={{ height: "25%" }}
                        ></div>
                        <div className="mt-2 text-xs">Graphs</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className="w-12 bg-primary rounded-t-md"
                          style={{ height: "50%" }}
                        ></div>
                        <div className="mt-2 text-xs">DP</div>
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-gray-500">
                      Topic Performance (Higher is better)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
        >
          <div className="container px-4 md:px-6">
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
                  <AccordionTrigger>
                    Is LastMinPrep really free?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes! During our launch period, all features are completely
                    free. We&apos;re focused on building the best platform for
                    interview preparation and gathering user feedback.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    How does the AI generate questions?
                  </AccordionTrigger>
                  <AccordionContent>
                    Our AI is trained on thousands of real interview questions
                    from top tech companies. It analyzes patterns and creates
                    new questions that test similar concepts but are unique to
                    ensure you&apos;re truly learning rather than memorizing.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    How accurate is the AI code evaluation?
                  </AccordionTrigger>
                  <AccordionContent>
                    Our AI evaluates code on multiple dimensions: correctness,
                    efficiency, readability, and best practices. It&apos;s been
                    trained on millions of code samples and can identify common
                    pitfalls and optimization opportunities with high accuracy.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Can I practice for specific companies?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes! You can select target companies, and our AI will
                    generate questions that match their known interview patterns
                    and focus areas.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    How often are new questions added?
                  </AccordionTrigger>
                  <AccordionContent>
                    Since our questions are AI-generated, you&apos;ll never run
                    out of practice material. The AI creates unique questions
                    based on your skill level and areas that need improvement.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
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
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
