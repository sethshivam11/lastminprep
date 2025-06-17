import TestDetails from "@/components/TestDetails";
import { getTest } from "@/services/tests";
import { notFound } from "next/navigation";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const test = await getTest(id, true);

  if (!test || !test.success) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4 sm:p-10 p-4 max-w-7xl mx-auto min-h-screen">
      <TestDetails test={test.data} />
      {/* <Analytics id={id} />
      <Attempts id={id} /> */}
    </div>
  );
}

// async function Analytics({ id }: { id: string }) {
//   const analytics = await getTestAnalytics(id);
//   if (!analytics || !analytics.success) {
//     return <div className="text-red-500">Failed to load analytics.</div>;
//   }

//   return (
//     <div className="grid md:grid-cols-2 gap-4">
//       <ScoreTrends scores={analytics.data.scores} />
//       <CorrectAnswers
//         correct={analytics.data.correct}
//         total={analytics.total}
//       />
//     </div>
//   );
// }

// async function Attempts({ id }: { id: string }) {
//   const attempts = await getAttempts(id);

//   if (!attempts || !attempts.success) {
//     return <div className="text-red-500">Failed to load attempts.</div>;
//   }

//   return <TestAttempts attempts={attempts.data} />;
// }

export default Page;
