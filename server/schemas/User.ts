import { z } from 'zod'

export const UserSchemaPayload = z
  .object({
    id: z.number(),
    email: z.email(),
    password_hash: z.string(),
    display_name: z.string().optional(),
    created_at: z.date().optional()
  })
  .strict()

export const UserSchemaResponse = z.object({
  user: UserSchemaPayload,
  token: z.string()
})
