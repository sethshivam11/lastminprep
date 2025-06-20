"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

function EditProfile() {
  const session = useSession();
  return (
    session.status === "authenticated" && (
      <Button className="w-full" variant="secondary" asChild>
        <Link href="/profile">Edit Profile</Link>
      </Button>
    )
  );
}

export default EditProfile;
