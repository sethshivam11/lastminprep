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

const bioSchema = z
  .string()
  .min(10, {
    message: "Bio must be at least 10 characters long",
  })
  .max(500, {
    message: "Bio is too long",
  });

const websiteSchema = z
  .string()
  .trim()
  .optional()
  .refine(
    (url) => {
      if (!url) return true;
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Invalid URL" }
  );

const githubSchema = z
  .string()
  .trim()
  .optional()
  .refine(
    (url) => {
      if (!url) return true;
      const regex = /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/;
      return regex.test(url);
    },
    { message: "Invalid GitHub URL" }
  );

const xSchema = z
  .string()
  .trim()
  .optional()
  .refine(
    (url) => {
      if (!url) return true;
      const regex =
        /^https:\/\/(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/?$/;
      return regex.test(url);
    },
    { message: "Invalid X (Twitter) URL" }
  );

const linkedinSchema = z
  .string()
  .trim()
  .optional()
  .refine(
    (url) => {
      if (!url) return true;
      const regex = /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
      return regex.test(url);
    },
    { message: "Invalid LinkedIn URL" }
  );

const skillsSchema = z
  .array(z.string())
  .min(1, {
    message: "You must add at least one skill",
  })
  .refine(
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
