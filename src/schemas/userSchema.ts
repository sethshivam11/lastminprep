import { z } from "zod";

const emailSchema = z
  .string()
  .email()
  .min(1, {
    message: "Email is required",
  })
  .max(100, {
    message: "Email is too long",
  });

const fullNameSchema = z
  .string()
  .min(2, {
    message: "Full name is required",
  })
  .max(100, {
    message: "Full name is too long",
  });

const loginTypeSchema = z.enum(["GITHUB", "GOOGLE"], {
  message: "Invalid login type",
});

const passwordSchema = z
  .string()
  .min(6, {
    message: "Password must be at least 6 characters",
  })
  .max(100, {
    message: "Password is too long",
  });

export { emailSchema, fullNameSchema, loginTypeSchema, passwordSchema };
