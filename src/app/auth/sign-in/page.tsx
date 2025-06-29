"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { emailSchema, passwordSchema } from "@/schemas/userSchema";
import { toast } from "sonner";
import Link from "next/link";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (result?.error) {
      if (result.error === "User is not verified") {
        toast.error("Sign In failed", {
          description: "Please verify your email to continue",
        });
        router.push(`/auth/verify-email/${encodeURIComponent(data.email)}`);
        setIsSubmitting(false);
        return;
      }

      toast.error("Sign In failed", {
        description: result.error || "Incorrect email or password",
      });
      setIsSubmitting(false);
    }

    if (result?.url) {
      router.replace(result.url);
    }

    setIsSubmitting(false);
  };

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
        <CardContent className="pb-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        inputMode="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="flex w-full items-center relative group">
                      <FormControl>
                        <Input
                          autoComplete="current-password"
                          type={showPwd ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pr-8"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPwd((prev) => !prev)}
                        className="text-muted group-focus-within:text-muted-foreground absolute right-0 p-2"
                      >
                        {showPwd ? <EyeOff size="20" /> : <Eye size="20" />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="flex flex-col sm:space-x-0 gap-2 px-0">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !form.formState.isValid}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  asChild
                >
                  <Link href="/auth/options">Try another way</Link>
                </Button>
                <p>
                  Don&apos;t have an acount?&nbsp;
                  <Link
                    href="/auth/sign-up"
                    type="button"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Sign Up
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
