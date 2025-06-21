import TestAnalytics from "@/components/TestAnalytics";
import { TestAttempts } from "@/components/TestAttempts";
import TestDetails from "@/components/TestDetails";
import { getTest } from "@/services/tests";
import { notFound } from "next/navigation";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const test = await getTest(id, true);

  if (!test || !test.success) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-4 sm:p-10 p-4 max-w-7xl mx-auto min-h-screen">
      <TestDetails test={test.data} />
      <TestAnalytics testId={id} />
      <TestAttempts testId={id} />
    </div>
  );
}

export default Page;
