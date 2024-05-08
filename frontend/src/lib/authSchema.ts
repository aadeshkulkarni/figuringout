import { z } from "zod";

import { AuthUserData } from "../interface";

export const SignUpSchema = z
  .object({
    name: z.string().min(3, "Name at least 3 characters!"),
    email: z.string().email(),
    password: z.string().min(6, "Password at least 6 characters!"),
    confirmPassword: z.string().min(6, "Confirm Password must!"),
  })
  .refine((data: AuthUserData) => data.password === data.confirmPassword, {
    message: "Password have to match!",
    path: ["confirmPassword"],
  });

export type tsSignUpSchema = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password at least 6 characters!"),
});

export type tsSignInSchema = z.infer<typeof SignInSchema>;