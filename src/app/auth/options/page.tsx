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
import { SocialButtons } from "@/components/SocialButtons";

const Page = () => {
  return (
    <div className="flex justify-center items-center max-w-7xl mx-auto min-h-screen max-sm:px-2">
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
            <Link href="/auth/sign-in" className="cursor-default">
              <Mail /> Continue with Email
            </Link>
          </Button>
          <SocialButtons />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
