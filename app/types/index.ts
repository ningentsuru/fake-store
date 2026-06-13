import { z } from 'zod'
import type {
  UserSchemaPayload,
  UserSchemaResponse
} from '@/../server/schemas/User'
import type { UploadSchemaResponse } from '@/../server/schemas/Upload'

export type UserPayload = z.infer<typeof UserSchemaPayload>
export type UserResponse = z.infer<typeof UserSchemaResponse>
export type UploadResponse = z.infer<typeof UploadSchemaResponse>
