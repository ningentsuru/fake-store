import { z } from 'zod'

export const UserSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8),
    display_name: z.string().optional(),
  })
  .strict()
