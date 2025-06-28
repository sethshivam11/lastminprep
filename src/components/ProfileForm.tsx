"use client";

import React, { useEffect, useState } from "react";
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
  genderSchema,
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
import { Globe, Loader2 } from "lucide-react";
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
import { ProfileProps } from "@/app/profile/page";
import { DatePicker } from "./DatePicker";

function ProfileForm({ profile }: { profile: ProfileProps }) {
  const { data } = useSession();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);

  const formSchema = z.object({
    fullName: fullNameSchema,
    gender: genderSchema,
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
      gender: profile.gender || "prefer not to say",
      birthday: profile.birthday ? new Date(profile.birthday) : new Date(),
      location: profile.location || "",
      bio: profile.bio || "",
      skills: profile.skills || [],
      website: profile.social.website || "",
      github: profile.social.github || "",
      x: profile.social.x || "",
      linkedin: profile.social.linkedin || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const response = await updateProfile(values);
    if (response.success) {
      toast.success("Profile updated successfully!");
      form.reset();
      router.push(`/profile/${response.data._id}`);
    } else {
      toast.error(response.message);
    }
    setSubmitting(false);
  }

  console.log(form.watch("birthday"));

  useEffect(() => {
    if (!data?.user.fullName) return;
    form.setValue("fullName", data.user.fullName);
  }, [data]);

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
                <FormItem className="sm:col-span-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2 w-full">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full capitalize">
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "male",
                            "female",
                            "others",
                            "prefer not to say",
                          ].map((item, index) => (
                            <SelectItem
                              key={index}
                              value={item}
                              className="capitalize"
                            >
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <DatePicker date={field.value} setDate={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                          <SelectValue placeholder="Country" />
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
                          <SelectValue placeholder="State" />
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
                          <SelectValue placeholder="City" />
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
        <div className="grid sm:grid-cols-2 gap-4">
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
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={submitting || !form.formState.isValid}
        >
          {submitting ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </form>
    </Form>
  );
}

export default ProfileForm;
