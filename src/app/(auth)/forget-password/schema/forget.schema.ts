import * as zod from "zod";

export const forgetSchema = zod
  .object({
    email: zod
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),

    resetCode: zod.string().optional(),

    password: zod
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional()
      .or(zod.literal("")),

    confirmPassword: zod.string().optional().or(zod.literal("")),
  })
  .refine(
    (data) => {
      if (data.password && data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    },
  );

export type ForgetType = zod.infer<typeof forgetSchema>;
