import { z } from "zod";

const birthdaySchema = z.date().refine(
  (date) => {
    const today = new Date();
    return date < today;
  },
  {
    message: "Birthday must be in the past",
  }
);

const locationSchema = z.string();

const bioSchema = z.string().max(500, {
  message: "Bio is too long",
});

const websiteSchema = z.string().url({
  message: "Invalid URL",
});

const githubSchema = z
  .string()
  .url({
    message: "Invalid GitHub URL",
  })
  .refine((url) => {
    const regex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+$/;
    return regex.test(url);
  });

const xSchema = z
  .string()
  .url({
    message: "Invalid X URL",
  })
  .refine((url) => {
    const regex = /^(https?:\/\/)?(www\.)?x\.com\/[a-zA-Z0-9_-]+$/;
    return regex.test(url);
  });

const linkedinSchema = z
  .string()
  .url({
    message: "Invalid LinkedIn URL",
  })
  .refine((url) => {
    const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/;
    return regex.test(url);
  });

const skillsSchema = z.array(z.string()).refine(
  (skills) => {
    return skills.length <= 100;
  },
  {
    message: "You can only add up to 100 skills",
  }
);

export {
  birthdaySchema,
  locationSchema,
  bioSchema,
  websiteSchema,
  githubSchema,
  xSchema,
  linkedinSchema,
  skillsSchema,
};
