"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";

function Actions() {
  const { status } = useSession();

  return (
    <div className="flex flex-col gap-2 min-[400px]:flex-row">
      {status === "authenticated" ? (
        <>
          <Button size="lg" asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              Dashboard
              <ArrowRight />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/tests">Tests</Link>
          </Button>
        </>
      ) : (
        <>
          <Button size="lg">
            <Link href="/auth/options" className="flex items-center gap-2">
              Get Started
              <ArrowRight />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/auth/options">Already a Member</Link>
          </Button>
        </>
      )}
    </div>
  );
}

export default Actions;
