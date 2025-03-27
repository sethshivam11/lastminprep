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
import {
  emailSchema,
  fullNameSchema,
  passwordSchema,
} from "@/schemas/userSchema";
import { toast } from "sonner";
import Link from "next/link";
import axios, { AxiosError } from "axios";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const router = useRouter();

  const formSchema = z
    .object({
      fullName: fullNameSchema,
      email: emailSchema,
      password: passwordSchema,
      confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const { data } = await axios.post("/api/sign-up", payload);

      if (data?.success) {
        router.replace(
          `/auth/verify-code/${encodeURIComponent(payload.email)}`
        );
        toast.success("Account created successfully", {
          description: "Please verify your email to continue",
        });
      } else {
        toast.error("Sign up failed", {
          description: data?.message || "An error occured",
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return toast.error("Sign up failed", {
          description: error?.response?.data?.message || "An error occured",
        });
      }
      const description =
        error instanceof Error ? error?.message : "An error occurred";
      toast.error("Sign up failed", { description });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center max-w-7xl mx-auto min-h-screen">
      <Card className="w-[500px] mx-auto bg-gradient-to-br from-primary/10 via-primary/0 to-primary/0">
        <CardHeader>
          <CardTitle className="text-center text-3xl tracking-tight font-bold">
            Create Your Account 🚀
          </CardTitle>
          <CardDescription className="text-center">
            📝 Sign up to ace your interviews with AI!
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="name"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        <Input
                          autoComplete="new-password"
                          type={showPwd ? "text" : "password"}
                          placeholder="Enter some password"
                          className="w-full border-0 focus-visible:ring-0"
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <div className="flex w-full items-center space-x-2 rounded-lg relative overflow-hidden border border-input pr-2 group">
                      <FormControl>
                        <Input
                          autoComplete="new-password webauthn"
                          type={showPwd ? "text" : "password"}
                          placeholder="Re-enter your password"
                          className="w-full border-0 focus-visible:ring-0"
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
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  asChild
                >
                  <Link href="/auth/options">Try Another way</Link>
                </Button>
                <p className="pt-2">
                  Already have an acount?&nbsp;
                  <Link
                    href="/auth/sign-in"
                    type="button"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Sign In
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
