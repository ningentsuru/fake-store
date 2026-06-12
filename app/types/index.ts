import { z } from 'zod'
import type {
  UserSchemaPayload,
  UserSchemaResponse
} from '@/../server/schemas/User'

export type UserPayload = z.infer<typeof UserSchemaPayload>
export type UserResponse = z.infer<typeof UserSchemaResponse>
