"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

function EditProfile({ profileId }: { profileId: string }) {
  const session = useSession();

  const handleShare = () => {
    const shareData = {
      title: `${session.data?.user?.fullName}'s Profile`,
      text: `🚀 Check out my profile on LastMinPrep!\n\n💡 I’ve been boosting my preparation with AI-powered MCQ and coding challenges, complete with 📊 personalized analytics.\n\n✨ Join LastMinPrep — the smartest way to get interview-ready with real-time insights! 🚀\n\n`,
      url: `${process.env.PUBLIC_NEXT_LINK}/profile/${profileId}`,
    };
    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Profile shared successfully"))
        .catch((error) => console.error("Error sharing profile:", error));
    } else {
      const shareUrl = `${window.location.origin}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        toast.success("Copied to clipboard");
      });
    }
  };
  return (
    session.status === "authenticated" && (
      <div className="space-y-2 mt-2">
        <Button className="w-full" asChild>
          <Link href="/profile">Edit Profile</Link>
        </Button>
        <Button className="w-full" variant="outline" onClick={handleShare}>
          Share Profile
        </Button>
      </div>
    )
  );
}

export default EditProfile;
