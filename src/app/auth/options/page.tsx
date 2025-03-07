import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[500px] mx-auto bg-gradient-to-br from-primary/10 via-primary/0 to-primary/0">
        <CardHeader>
          <CardTitle className="text-center text-3xl tracking-tight font-bold">
            Welcome to LastMinPrep 🚀
          </CardTitle>
          <CardDescription className="text-center">
            Sign In to start your AI-powered prep!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button type="submit" className="w-full" asChild>
            <Link href="/auth/sign-in">
              <Mail /> Continue with Email
            </Link>
          </Button>
          <Button
            variant="outline"
            className="w-full"
            title="Continue with Google"
          >
            <Image src="/google.svg" alt="Google" width="20" height="20" />{" "}
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full"
            title="Continue with GitHub"
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
          <p className="text-center">
            Don&sapos;t have an acount?&nbsp;
            <Link
              href="/sign-up"
              type="button"
              className="text-blue-500 hover:text-blue-600"
            >
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
