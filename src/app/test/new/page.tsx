"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  codingOptions,
  difficulty,
  languages,
  mcqOptions,
} from "@/lib/helpers";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  codingCountSchema,
  difficultySchema,
  extraDescSchema,
  jobDescSchema,
  languageSchema,
  mcqCountSchema,
} from "@/schemas/testSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const formSchema = z.object({
    difficulty: difficultySchema,
    coding: codingCountSchema,
    mcq: mcqCountSchema,
    language: languageSchema,
    extraDesc: extraDescSchema,
    jobDesc: jobDescSchema,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(
      `/test/appearing?query=${encodeURIComponent(JSON.stringify(values))}`
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:p-10 p-4 space-y-6 max-w-4xl mx-auto"
      >
        <h1 className="sm:text-5xl text-3xl tracking-tight font-bold">
          Start Test
        </h1>
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {languages.map((language, index) => (
                        <SelectItem key={index} value={language}>
                          {language.charAt(0).toUpperCase() + language.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {difficulty.map((item, index) => (
                        <SelectItem key={index} value={item}>
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid sm:grid-cols-2 sm:gap-2 gap-6">
          <FormField
            control={form.control}
            name="mcq"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MCQs</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Number of MCQs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {mcqOptions.map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coding"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coding Questions</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Number of Coding Questions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {codingOptions.map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="jobDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide a job description to tailor the test"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="extraDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Information (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide any extra information that you want to include in the test"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >
          Start Test
        </Button>
      </form>
    </Form>
  );
}

export default Page;
