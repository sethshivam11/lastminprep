import TestAnalytics from "@/components/TestAnalytics";
import { AttemptsTable } from "@/components/AttemptsTable";
import TestDetails from "@/components/TestDetails";
import { getTest } from "@/services/tests";
import { notFound } from "next/navigation";

async function Page({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;
  const test = await getTest(testId);

  if (!test || !test.success) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-4 sm:p-10 p-4 max-w-7xl mx-auto min-h-screen">
      <TestDetails test={test.data} />
      <TestAnalytics testId={testId} />
      <AttemptsTable testId={testId} />
    </div>
  );
}

export default Page;
