"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useEffect, useRef, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { emailSchema, otpSchema } from "@/schemas/userSchema";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { Input } from "@/components/ui/input";

const Page = ({ params }: { params: Promise<{ email: string }> }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const router = useRouter();

  const formSchema = z.object({
    code: otpSchema,
    email: emailSchema,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      code: "",
    },
  });

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const { data } = await axios.post("/api/verify-code", payload);

      if (data?.success) {
        router.replace("/dashboard");
        toast.success("Account verified successfully");
      } else {
        toast.error("Cannot verify code", {
          description: data?.message || "An error occurred",
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return toast.error("Cannot verify code", {
          description: error?.response?.data?.message || "An error occurred",
        });
      }
      const description =
        error instanceof Error ? error?.message : "An error occurred";
      toast.error("Cannot verify code", { description });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setIsSubmitting(true);
    try {
      emailSchema.parse(form.getValues("email"));
      const { data } = await axios.get(
        `/api/resend-mail?email=${form.getValues("email")}`
      );
      if (data?.success) {
        setTimer(60);
        timerRef.current = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
        toast.success("Email sent successfully", {
          description: "Please check your email for the verification code",
        });
      } else {
        toast.error("Failed to resend email", {
          description: data?.message || "An error occurred",
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        return toast.error("Failed to resend email", {
          description: "Please check the url or try signing-in",
        });
      } else if (error instanceof AxiosError) {
        return toast.error("Failed to resend email", {
          description: error?.response?.data?.message || "An error occurred",
        });
      }
      const description =
        error instanceof Error ? error?.message : "An error occurred";
      toast.error("Failed to resend email", { description });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    params.then((resolvedParams) => {
      const email = decodeURIComponent(resolvedParams.email);
      form.setValue("email", email);
    });

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [params]);

  return (
    <div className="flex justify-center items-center max-w-7xl mx-auto min-h-screen">
      <Card className="w-[500px] mx-auto bg-gradient-to-br from-primary/10 via-primary/0 to-primary/0">
        <CardHeader>
          <CardTitle className="text-center text-3xl tracking-tight font-bold">
            Verify Your Account
          </CardTitle>
          <CardDescription className="text-center">
            Enter the OTP sent to your email address to verify your account
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input
                        inputMode="numeric"
                        placeholder="Enter the 6-digit code"
                        autoComplete="one-time-code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="flex flex-col sm:space-x-0 gap-2 px-0">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
                <p className="pt-2">
                  Didn&apos;t recieve a code?&nbsp;
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-600 disabled:text-blue-800"
                    disabled={timer > 0 || isSubmitting}
                    onClick={handleResend}
                  >
                    Resend
                    {timer > 0 && <span> in {timer}s</span>}
                  </button>
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
