"use client";
import { Button } from "./ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { toast } from "sonner";

const OAuthButtons = () => {
  const params = useSearchParams();

  useEffect(() => {
    const error = params.get("error");
    if (error) {
      toast.error("Error", {
        description: error || undefined,
      });
    }
  }, [params]);

  return (
    <>
      <Button
        variant="outline"
        className="w-full"
        title="Continue with Google"
        onClick={() => signIn("google")}
      >
        <Image src="/google.svg" alt="Google" width="20" height="20" /> Continue
        with Google
      </Button>
      <Button
        variant="outline"
        className="w-full"
        title="Continue with GitHub"
        onClick={() => signIn("github")}
      >
        <Image
          src="/github.svg"
          alt="Google"
          width="20"
          height="20"
          className="dark:hidden"
        />
        <Image
          src="/github-white.svg"
          alt="Google"
          width="20"
          height="20"
          className="hidden dark:inline"
        />{" "}
        Continue with GitHub
      </Button>
    </>
  );
};

export const SocialButtons = () => (
  <Suspense>
    <OAuthButtons />
  </Suspense>
);
