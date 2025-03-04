"use client";

import React from "react";
import { useCompletion } from "ai/react";
import { Loader2 } from "lucide-react";

function Page({}) {
  const { complete, isLoading, completion } = useCompletion({
    api: "/api/test",
    body: {
      mcqCount: 1,
      codingCount: 1,
      language: "javascript",
      difficulty: "easy",
      jobDesc: "",
      extraDesc: "",
    },
  });

  const fetchTest = () => {
    try {
      complete("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        <button onClick={() => navigator.clipboard.writeText(completion)}>
            copy
        </button>
      <button onClick={fetchTest} disabled={isLoading} className="bg-stone-800 px-4 py-2 rounded-md text-white flex items-center justify-center disabled:opacity-80">
        {isLoading ? <Loader2 className="animate-spin" /> : "Create Test"}
      </button>
      {completion}
    </div>
  );
}

export default Page;

// const response = `### MCQ ###
// Question: What is the output of the following JavaScript code snippet?  !!!console.log(typeof(null));!!!
// Options: object, null, undefined, number
// Answer: object
// ---
// ### CODING ###
// Question: Write a JavaScript function that takes an array of numbers as input and returns the sum of all the numbers in the array.
// Expected Input Format: An array of numbers.
// Expected Output Format: A single number representing the sum of all numbers in the input array.
// Constraints: The input array will contain only numbers.  The array can be empty.
// Example Input: [1, 2, 3, 4, 5]
// Example Output: 15
// !!!function sumArray(arr) {let sum = 0; for (let i = 0; i < arr.length; i++) {sum += arr[i];} return sum;}!!!`



// const [mcqRes, codingRes] = response.split("---");

// const mcqQuestions = mcqRes.split('### MCQ ###').filter(Boolean).map((mcq) => {
//   const lines = mcq.trim().split('\n');
//   const question = lines[0]?.replace('Question: ', '').trim();
//   console.log(lines[0]?.includes("!!!"))
//   const codeblock = lines[0]?.includes("!!!") ? lines[0]?.replace("!!!", ""): "";
//   const options = lines[1]?.replace('Options: ', '').split(',').map(opt => opt.trim());
//   const answer = lines[2]?.replace('Answer: ', '').trim();
//   return { question, codeblock, options, answer };
// });
// console.log(mcqQuestions)

// const codingQuestions = codingRes.split('### CODING ###').filter(Boolean).map((coding) => {
//   const lines = coding.trim().split('\n');

//   if (lines.length >= 6) {
//     const question = lines[0]?.replace('Question: ', '').trim();
//     const inputFormat = lines[1]?.replace('Expected Input Format: ', '').trim();
//     const outputFormat = lines[2]?.replace('Expected Output Format: ', '').trim();
//     const constraints = lines[3]?.replace('Constraints: ', '').trim();
//     const exampleInput = lines[4]?.replace('Example Input: ', '').trim();
//     const exampleOutput = lines[5]?.replace('Example Output: ', '').trim();
//     const codeblock = lines[6]?.replace("!!!", "");

//     return {
//       question,
//       inputFormat,
//       outputFormat,
//       constraints,
//       exampleInput,
//       exampleOutput,
//       codeblock
//     };
//   }
//   return null; 
// }).filter(Boolean);

// console.log(codingQuestions);