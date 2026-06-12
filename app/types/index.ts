import { z } from 'zod'
import type { UserSchema } from '@/../server/schemas/User'

export type UserPayload = z.infer<typeof UserSchema>
