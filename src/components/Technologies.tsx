import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


function Technologies() {
  return (
    <section id="technologies" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Technologies Covered
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Practice with questions across popular programming languages and
              topics
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
  );
}

export default Technologies;
