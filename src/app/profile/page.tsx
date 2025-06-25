"use client";

import ProfileForm from "@/components/ProfileForm";
import { Button } from "@/components/ui/button";
import { getUserProfile } from "@/services/profile";
import { Globe, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export interface ProfileProps {
  _id: string;
  user: string;
  bio: string;
  location: string;
  skills: string[];
  birthday: string;
  gender: "male" | "female" | "others" | "prefer not to say";
  social: {
    x?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  createdAt: string;
}

function Page() {
  const [profile, setProfile] = useState<ProfileProps>({
    _id: "",
    user: "",
    bio: "",
    location: "",
    skills: [],
    birthday: "",
    gender: "prefer not to say",
    social: {
      x: "",
      linkedin: "",
      github: "",
      website: "",
    },
    createdAt: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getUserProfile();
      if (response?.success) {
        setProfile(response.data);
      }
      setLoading(false);
    };
    if (profile._id) return;
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-screen">
        <Loader2 className="animate-spin" size="40" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:gap-10 gap-4 sm:p-10 p-4 max-w-4xl mx-auto min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="sm:text-5xl text-3xl tracking-tight font-bold">
          Profile
        </h1>
        {profile._id && (
          <Link href={`/profile/${profile._id}`}>
            <Button>
              <Globe /> View Profile
            </Button>
          </Link>
        )}
      </div>
      <ProfileForm profile={profile} />
    </div>
  );
}

export default Page;
