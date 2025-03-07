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
      redirect: true,
    });

    if (result?.error) {
      toast.error("Login failed", {
        description: result.error || "Incorrect username or password",
      });
    }

    if (result?.url) {
      router.replace("/dashboard");
    }

    setIsSubmitting(false);
  };

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
                    <div className="flex w-full items-center space-x-2 rounded-lg relative overflow-hidden border border-input pr-2 group">
                      <FormControl>
                        <input
                          autoComplete="current-password"
                          type={showPwd ? "text" : "password"}
                          placeholder="Enter your password"
                          className="w-full bg-background p-2 outline-none text-sm"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPwd((prev) => !prev)}
                        className="text-muted group-focus-within:text-muted-foreground"
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
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/auth/options">Try another way</Link>
                </Button>
                <p>
                  Don&apos;t have an acount?&nbsp;
                  <Link
                    href="/sign-up"
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
