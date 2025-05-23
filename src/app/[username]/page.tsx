import EditProfile from "@/components/EditProfile";
import GithubIcon from "@/components/icons/Github";
import LinkedinIcon from "@/components/icons/Linkedin";
import XIcon from "@/components/icons/X";
import { InterviewActivity } from "@/components/InterviewActivity";
import { PerformanceTrend } from "@/components/PerformanceTrend";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Country } from "country-state-city";
import {
  Award,
  Brain,
  CheckCircle,
  LinkIcon,
  MapPin,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Page() {
  const user = {
    avatar:
      "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1741416419/lastminprep/qnzy9jiix6hyfrr4cddx.png",
    fullName: "John Doe",
    birthday: new Date(),
    location: "IN, UP, Lucknow",
    gender: "male",
    social: {
      website: "https://example.com",
      x: "https://x.com/example",
      linkedin: "https://linkedin.com/in/example",
      github: "https://github.com/example",
    },
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
  };
  const analytics = [
    {
      title: "Total Interviews",
      value: 87,
      icon: <CheckCircle />,
      color: "text-green-500",
    },
    {
      title: "Average Score",
      value: 75,
      icon: <Award />,
      isPercentage: true,
      color: "text-yellow-500",
    },
    {
      title: "Completion Rate",
      value: 120,
      icon: <Brain />,
      isPercentage: true,
      color: "text-blue-500",
    },
    {
      title: "Total Questions",
      value: 90,
      icon: <TrendingUp />,
      color: "text-red-500",
    },
  ];
  const sessions = [
    {
      title: "JavaScript Interview",
      createdAt: "2023-10-01",
      score: 86,
    },
    {
      title: "React Interview",
      createdAt: "2023-09-28",
      score: 75,
    },
    {
      title: "Node.js Interview",
      createdAt: "2023-09-25",
      score: 90,
    },
    {
      title: "CSS Interview",
      createdAt: "2023-09-20",
      score: 80,
    },
    {
      title: "HTML Interview",
      createdAt: "2023-09-15",
      score: 70,
    },
  ];

  return (
    <div className="flex flex-col sm:gap-10 gap-4 sm:p-10 p-4 max-w-7xl mx-auto min-h-screen">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
        <Card className="flex flex-col items-center p-4 pt-0 border-input rounded-lg">
          <CardHeader>
            <Image
              src={user.avatar}
              alt={user.fullName + "'s image"}
              width="200"
              height="200"
              className="w-full select-none"
              draggable={false}
            />
            <CardTitle className="lg:text-4xl sm:text-3xl text-2xl tracking-tight font-bold">
              {user.fullName}
            </CardTitle>
            <p className="text-muted-foreground">
              {user.gender === "male"
                ? "he/him"
                : user.gender === "female"
                ? "she/her"
                : "they/them"}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{user.bio}</p>
            <p className="text-muted-foreground flex items-center gap-1 mt-2">
              <MapPin size="16" />
              {Country.getCountryByCode(user.location.split(",")[0])?.name}
            </p>
            <Link
              href={user.social.website}
              className="text-muted-foreground flex items-center gap-1 mt-2"
            >
              <LinkIcon size="16" />
              <span className="hover:text-blue-500 hover:underline">
                {user.social.website}
              </span>
            </Link>
            <Link
              href={user.social.github}
              className="text-muted-foreground flex items-center gap-1 mt-2"
            >
              <GithubIcon />
              <span className="hover:text-blue-500 hover:underline">
                {user.social.github.split("github.com")[1]}
              </span>
            </Link>
            <Link
              href={user.social.x}
              className="text-muted-foreground flex items-center gap-1 mt-2"
            >
              <XIcon />
              <span className="hover:text-blue-500 hover:underline">
                @{user.social.x.split("x.com/")[1]}
              </span>
            </Link>
            <Link
              href={user.social.linkedin}
              className="text-muted-foreground flex items-center gap-1 mt-2"
            >
              <LinkedinIcon />
              <span className="hover:text-blue-500 hover:underline">
                {user.social.linkedin.split("linkedin.com")[1]}
              </span>
            </Link>
          </CardContent>
          <CardFooter className="w-full">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex gap-2 flex-wrap">
                {user.skills.map((skill, index) => (
                  <Link
                    href={"https://google.com/search?q=" + skill}
                    target="_blank"
                    key={index}
                  >
                    <Badge>{skill}</Badge>
                  </Link>
                ))}
              </div>
              <EditProfile />
            </div>
          </CardFooter>
        </Card>
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
            <InterviewActivity />
            <PerformanceTrend />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Sessions</CardTitle>
              <CardDescription>
                Your last {sessions.length} interview practice sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {sessions.map(({ title, score, createdAt }, index) => (
                  <div
                    className="flex items-center justify-between"
                    key={index}
                  >
                    <div className="flex flex-col justify-center">
                      <h1 className="font-semibold tracking-tight">{title}</h1>
                      <p className="text-muted-foreground text-sm">
                        {new Date(createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <Badge className="rounded-xl">
                      {score}
                      {score && "%"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Page;
