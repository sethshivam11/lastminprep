"use client";

import React from "react";
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
import { X } from "lucide-react";

function ProfileForm() {
  const [skill, setSkill] = React.useState("");

  const formSchema = z.object({
    fullName: fullNameSchema,
    birthday: birthdaySchema,
    location: locationSchema,
    website: websiteSchema,
    github: githubSchema,
    x: xSchema,
    linkedin: linkedinSchema,
    bio: bioSchema,
    skills: skillsSchema,
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function handleSkills(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value.includes(" ")) {
      const skills = [...form.getValues("skills"), skill.trim()];
      const uniqueSkills = [...new Set(skills)];
      form.setValue("skills", uniqueSkills);
      setSkill("");
    } else {
      setSkill(value);
    }
  }

  function handleRemoveSkill(skill: string) {
    const skills = form.getValues("skills").filter((s) => s !== skill);
    form.setValue("skills", skills);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/5 space-y-8">
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
                    <SelectTrigger id="birthday">
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
                    <SelectTrigger>
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i} value={(i + 1).toString()}>
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
                    <SelectTrigger>
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
                    <SelectTrigger id="location">
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
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {State.getStatesOfCountry(field.value.split(",")[0] || "")
                        .length > 0 ? (
                        State.getStatesOfCountry(
                          field.value.split(",")[0] || ""
                        ).map((state) => (
                          <SelectItem key={state.isoCode} value={state.isoCode}>
                            {state.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value={field.value.split(",")[0] || "IN"}>
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
                    <SelectTrigger>
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
                        <SelectItem value={field.value.split(",")[0] || "IN"}>
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
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
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
              <FormLabel>GitHub</FormLabel>
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
              <FormLabel>LinkedIn</FormLabel>
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
              <FormLabel>X (formerly Twitter)</FormLabel>
              <FormControl>
                <Input placeholder="Enter your x" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <div className="border-input border p-2 rounded-md flex gap-2">
                  <div className="flex items-center justify-center gap-2">
                    {field.value.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center gap-1 bg-primary text-primary-foreground rounded-xl text-sm px-2 py-1"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          <X size="15" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    id="skills"
                    type="text"
                    value={skill}
                    placeholder="Enter your skills"
                    onChange={handleSkills}
                    className="bg-transparent outline-none md:text-sm text-base w-full"
                  />
                </div>
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
