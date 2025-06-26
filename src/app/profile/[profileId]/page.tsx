import { InterviewActivity } from "@/components/InterviewActivity";
import { PerformanceTrend } from "@/components/PerformanceTrend";
import ProfileCard from "@/components/ProfileCard";
import ProfileSessions from "@/components/ProfileSessions";
import { ProfileI } from "@/models/profile.model";
import { getProfile, getProfileAnalytics } from "@/services/profile";
import { Award, Brain, CheckCircle, TrendingUp } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

async function Page({ params }: { params: Promise<{ profileId: string }> }) {
  const { profileId } = await params;
  const profile: {
    success: boolean;
    data: ProfileI & { user: { fullName: string; avatar: string } };
  } = await getProfile(profileId);

  if (!profile?.success) {
    return notFound();
  }

  const analyticsData = await getProfileAnalytics(profileId);
  const analytics = [
    {
      title: "Total Interviews",
      value: analyticsData?.data.totalInterviews || 0,
      icon: <CheckCircle />,
      color: "text-green-500",
    },
    {
      title: "Average Score",
      value: analyticsData?.data.averageScore || 0,
      icon: <Award />,
      isPercentage: true,
      color: "text-yellow-500",
    },
    {
      title: "Completion Rate",
      value: analyticsData?.data.completionRate,
      icon: <Brain />,
      isPercentage: true,
      color: "text-blue-500",
    },
    {
      title: "Total Questions",
      value: analyticsData?.data.totalQuestions || 0,
      icon: <TrendingUp />,
      color: "text-red-500",
    },
  ];

  return (
    <div className="flex flex-col sm:gap-10 gap-4 sm:p-10 p-4 max-w-7xl mx-auto min-h-screen">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
        <ProfileCard profile={profile.data} />
        <div className="flex flex-col gap-4 lg:col-span-3 md:col-span-2">
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-2">
            {analytics.map(
              ({ title, value, icon, isPercentage, color }, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-4 border rounded-lg"
                >
                  <div className="flex items-center justify-between gap-1 text-muted-foreground text-left w-full">
                    <p className="max-sm:text-sm">{title}</p>
                    <span className={color}>{icon}</span>
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight w-full mt-4">
                    {value}
                    {isPercentage && "%"}
                  </h1>
                </div>
              )
            )}
          </div>
          <div className="grid lg:grid-cols-2 gap-2">
            <InterviewActivity profileId={profileId} />
            <PerformanceTrend profileId={profileId} />
          </div>
          <ProfileSessions profileId={profileId} />
        </div>
      </div>
    </div>
  );
}

export default Page;
