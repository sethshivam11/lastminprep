import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

function Technologies() {
  const tabs = [
    {
      name: "Languages",
      items: [
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
          name: "Python",
        },
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
          name: "Java",
        },
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
          name: "JavaScript",
        },
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
          name: "C++",
        },
        {
          icon: "/C.svg",
          name: "C",
        },
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
          name: "SQL",
        },
      ],
    },
    {
      name: "Topics",
      items: [
        { icon: "📊", name: "Arrays" },
        { icon: "📝", name: "Strings" },
        { icon: "🔗", name: "Linked Lists" },
        { icon: "🌲", name: "Trees" },
        { icon: "📊", name: "Graphs" },
        { icon: "📚", name: "Stacks" },
      ],
    },
    {
      name: "Concepts",
      items: [
        { icon: "🧩", name: "Algorithms" },
        { icon: "🌲", name: "Data Structures" },
        { icon: "⏱️", name: "Time Complexity" },
        { icon: "📏", name: "Space Complexity" },
        { icon: "🧠", name: "Problem Solving" },
        { icon: "🔄", name: "Dynamic Programming" },
      ],
    },
  ];

  return (
    <section id="technologies" className="w-full py-12 md:py-24 lg:py-32">
      <div className="px-4 md:px-6">
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
          <Tabs defaultValue="Languages" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {tabs.map(({ name }, index) => (
                <TabsTrigger key={index} value={name}>
                  {name}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map(({ name, items }, index) => (
              <TabsContent value={name} key={index} className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {items.map(({ icon, name: iconName }) => (
                    <div
                      key={iconName}
                      className="flex flex-col items-center p-4 bg-muted rounded-lg"
                    >
                      {name === "Languages" ? (
                        <Image
                          src={icon}
                          width="35"
                          height="35"
                          alt={iconName}
                          className="mb-2"
                        />
                      ) : (
                        <div className="text-3xl mb-2">{icon}</div>
                      )}
                      <span>{iconName}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default Technologies;
