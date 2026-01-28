import {z} from 'zod';
import {Gender} from "../../generated/prisma/enums";

export const changeUserPasswordSchema = z.object({
  email: z.string().min(1, {message: 'Please enter a valid email address'}).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  password: z.string().min(1, {message: 'Please enter a valid password'}),
  newPassword: z.string().min(1, {message: 'Please enter a new password'}),
  confirmPassword: z.string().min(1, {message: 'Please confirm your password'}),
}).refine((values) => values.newPassword.normalize() === values.confirmPassword.normalize(), {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Associates the error with the confirmPassword field
});

export type ChangeUserPassword = z.infer<typeof changeUserPasswordSchema>

export const changeUserRoleSchema = z.object({
  email: z.string().min(1, {message: 'Please enter a valid email address'}).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
})

export type ChangeUserRole = z.infer<typeof changeUserRoleSchema>

export const editProfileUserSchema = z.object({
  address: z.string(),
  name: z.string(),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  phone: z.string(),
  image: z.string(),
  gender: z.enum(Gender),
  dateOfBirth: z.string(),
  password: z.string(),
});

export type EditUserProfile = z.infer<typeof editProfileUserSchema>

export const loginUserSchema = z.object({
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  password: z.string(),
});

export type LoginUser = z.infer<typeof loginUserSchema>

export const signupUserSchema = z.object({
  address: z.string(),
  name: z.string(),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  phone: z.string(),
  image: z.string(),
  gender: z.enum(Gender),
  dateOfBirth: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
}).refine((values) => values.password.normalize() === values.confirmPassword.normalize(),
  {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Associates the error with the confirmPassword field
  });

export type SignupUser = z.infer<typeof signupUserSchema>

