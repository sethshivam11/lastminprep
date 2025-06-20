"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { fullNameSchema } from "@/schemas/userSchema";
import {
  bioSchema,
  birthdaySchema,
  githubSchema,
  linkedinSchema,
  locationSchema,
  skillsSchema,
  websiteSchema,
  xSchema,
} from "@/schemas/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Country, State, City } from "country-state-city";
import { Globe } from "lucide-react";
import AvatarInput from "./AvatarInput";
import { useSession } from "next-auth/react";
import InputTags from "./ui/input-tags";
import { Separator } from "./ui/separator";
import Github from "./icons/Github";
import Linkedin from "./icons/Linkedin";
import XIcon from "./icons/X";
import { updateProfile } from "@/services/profile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function ProfileForm() {
  const { data } = useSession();
  const router = useRouter();

  const formSchema = z.object({
    fullName: fullNameSchema,
    birthday: birthdaySchema,
    location: locationSchema,
    bio: bioSchema,
    skills: skillsSchema,
    website: websiteSchema,
    github: githubSchema,
    x: xSchema,
    linkedin: linkedinSchema,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      birthday: new Date(),
      location: "",
      website: "",
      github: "",
      x: "",
      linkedin: "",
      bio: "",
      skills: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await updateProfile(values);
    if (response.success) {
      toast.success("Profile updated successfully!");
      form.reset();
      router.push(`/${response.data._id}`);
    } else {
      toast.error(response.message);
    }
  }

  useEffect(() => {
    if (!data?.user.fullName) return;
    form.setValue("fullName", data.user.fullName);
  }, [data?.user]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <div className="flex max-md:flex-col items-center justify-center gap-4">
          <AvatarInput />
          <div className="space-y-8 w-full">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birthday</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 gap-2">
                      <Select
                        value={field.value.getDate().toString()}
                        onValueChange={(value) => {
                          const newDate = new Date(field.value);
                          newDate.setDate(parseInt(value));
                          field.onChange(newDate);
                        }}
                        name={field.name}
                      >
                        <SelectTrigger id="birthday" className="w-full">
                          <SelectValue placeholder="DD" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 31 }, (_, i) => (
                            <SelectItem key={i} value={(i + 1).toString()}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={field.value.getMonth().toString()}
                        onValueChange={(value) => {
                          const newDate = new Date(field.value);
                          newDate.setMonth(parseInt(value));
                          field.onChange(newDate);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={field.value.getFullYear().toString()}
                        onValueChange={(value) => {
                          const newDate = new Date(field.value);
                          newDate.setFullYear(parseInt(value));
                          field.onChange(newDate);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="YYYY" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 100 }, (_, i) => (
                            <SelectItem
                              key={i}
                              value={(new Date().getFullYear() - i).toString()}
                              suppressHydrationWarning
                            >
                              {new Date().getFullYear() - i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 gap-2">
                      <Select
                        value={field.value.split(",")[0] || ""}
                        onValueChange={(value) => {
                          const newLocation = field.value.split(",");
                          newLocation[0] = value;
                          field.onChange(newLocation.join(","));
                        }}
                        name={field.name}
                      >
                        <SelectTrigger id="location" className="w-full">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          {Country.getAllCountries().map((country) => (
                            <SelectItem
                              key={country.isoCode}
                              value={country.isoCode}
                            >
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={field.value.split(",")[1] || ""}
                        onValueChange={(value) => {
                          const newLocation = field.value.split(",");
                          newLocation[1] = value;
                          field.onChange(newLocation.join(","));
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          {State.getStatesOfCountry(
                            field.value.split(",")[0] || ""
                          ).length > 0 ? (
                            State.getStatesOfCountry(
                              field.value.split(",")[0] || ""
                            ).map((state) => (
                              <SelectItem
                                key={state.isoCode}
                                value={state.isoCode}
                              >
                                {state.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem
                              value={field.value.split(",")[0] || "IN"}
                            >
                              {
                                Country.getCountryByCode(
                                  field.value.split(",")[0] || "IN"
                                )?.name
                              }
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <Select
                        value={field.value.split(",")[2] || ""}
                        onValueChange={(value) => {
                          const newLocation = field.value.split(",");
                          newLocation[2] = value;
                          field.onChange(newLocation.join(","));
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                        <SelectContent>
                          {City.getCitiesOfState(
                            field.value.split(",")[0] || "",
                            field.value.split(",")[1] || ""
                          ).length ? (
                            City.getCitiesOfState(
                              field.value.split(",")[0] || "",
                              field.value.split(",")[1] || ""
                            ).map((city) => (
                              <SelectItem key={city.name} value={city.name}>
                                {city.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem
                              value={field.value.split(",")[0] || "IN"}
                            >
                              {
                                Country.getCountryByCode(
                                  field.value.split(",")[0] || "IN"
                                )?.name
                              }
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <InputTags {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Socials</h1>
          <Separator />
        </div>
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Globe size="18" /> Website
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your website" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Github />
                GitHub
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your github" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Linkedin /> LinkedIn
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your linkedin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="x"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <XIcon /> X / Twitter
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your X" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
}

export default ProfileForm;
