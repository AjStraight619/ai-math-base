import { z } from 'zod'

export const RegisterSchema = z
  .object({
    name: z.string(),
    email: z.string().email().min(3).max(50),
    password: z.string().min(8, {
      message: 'Password too short',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
})

const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const UpdateUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  image: z.string().url().or(z.literal('')).optional(),
})

export const NewChatSchema = z.object({
  name: z.string(),
  subject: z.string().optional(),
  tags: z.string().optional(),
})

export const ServerNewChatSchema = z.object({
  name: z.string(),
  subject: z.string().optional(),
  tags: z.array(TagSchema).optional(),
})
