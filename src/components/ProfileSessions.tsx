import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { getProfileSessions } from "@/services/profile";

interface Session {
  title: string;
  score: number | "N/A";
  createdAt: string;
}

async function ProfileSessions({ profileId }: { profileId: string }) {
  let sessions: Session[] = [];

  const response: {
    success: boolean;
    data: Session[];
  } = await getProfileSessions(profileId);
  if (response.success) {
    sessions = response.data;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recent Sessions</CardTitle>
        <CardDescription>
          Last {sessions.length} interview practice sessions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {sessions.map(({ title, score, createdAt }, index) => (
            <div className="flex items-center justify-between" key={index}>
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
                {score !== "N/A" && "%"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileSessions;
