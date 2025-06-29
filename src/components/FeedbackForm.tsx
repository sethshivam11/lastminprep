import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "./ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { BadgeCheck, Loader2, MessageSquare } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { submitFeedback } from "@/services/user";
import { toast } from "sonner";

function FeedbackForm() {
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const formSchema = z.object({
    requestedLimits: z
      .string()
      .min(1, "Please specify the limits you need")
      .max(500, ""),
    reason: z
      .string()
      .min(1, "Please provide a reason for your request")
      .max(500, ""),
    notes: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requestedLimits: "",
      reason: "",
      notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const response = await submitFeedback(values);
    if (response.success) {
      toast.success("Feedback submitted successfully!");
      form.reset();
      setDialogOpen(false);
    } else {
      if (!dialogOpen) setDialogOpen(true);
      toast.error(
        response.message || "Failed to submit feedback. Please try again."
      );
    }
    setSubmitting(false);
  }

  return (
    <Card className="justify-between">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <BadgeCheck className="h-5 w-5 text-rose-500" />
            <CardTitle className="text-xl">Need More Limits?</CardTitle>
          </div>
          <Badge
            variant="secondary"
            className="bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
          >
            Feedback
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground">
          We&apos;d love to hear from you! If you&apos;re finding the current usage limits
          restrictive, let us know about your needs and we&apos;ll work on expanding
          our AI capabilities.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="w-full"
                  type="button"
                  onClick={(open) => setDialogOpen(!open)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Share Feedback
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Share your feedback
                  </DialogTitle>
                  <DialogDescription>
                    We’d love to hear your thoughts, suggestions, or ideas on
                    how we can improve your experience.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <FormField
                    control={form.control}
                    name="requestedLimits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requested Limits</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="100 responses per day"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Want to run more tests"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Notes
                          <span className="text-muted-foreground">
                            (Optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional notes or suggestions"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter className="sm:flex-col max-sm:flex-col">
                  <Button
                    className="w-full"
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={submitting}
                    type="submit"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin" /> Submitting...
                      </>
                    ) : (
                      "Submit Feedback"
                    )}
                  </Button>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      disabled={submitting}
                      className="w-full"
                      type="button"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default FeedbackForm;
