import { z } from 'zod'

export const UploadSchemaResponse = z.object({
  success: z.boolean(),
  etag: z.string(),
  url: z.string(),
})
