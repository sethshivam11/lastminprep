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

const userIdSchema = z.string().uuid();

export { emailSchema, fullNameSchema, loginTypeSchema, userIdSchema };
