import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name must be at most 30 characters"),
    email: zod
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        `Has minimum 8 characters in length. Adjust it by modifying {8,}
At least one uppercase English letter
At least one lowercase English letter
At least one digit
At least one special character`,
      ),
    rePassword: zod.string().nonempty("Confirm Password is required"),
    phone: zod
      .string()
      .nonempty("Phone Number is required")
      .regex(/^01[0125]\d{8}$/, "Invalid Egyptian phone number"),
    terms: zod.boolean().refine((val) => val === true, {
      message: "You must accept the terms",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords must match",
    path: ["rePassword"],
  });

export type RegisterType = zod.infer<typeof registerSchema>;