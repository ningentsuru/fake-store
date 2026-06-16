import { z } from 'zod'

export const ItemSchemaResponse = z
  .object({
    id: z.number(),
    storage_id: z.number(),
    etag: z.string(),
    url: z.string()
  })
  .strict()
