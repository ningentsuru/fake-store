import { get } from '@vercel/blob'
import { db } from '@/../server/utils/db'

export default defineEventHandler(async (event) => {
  const etag = getRouterParam(event, 'etag')

  if (!etag) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing storage id'
    })
  }

  const storage = await db.one<{ url: string }>(
    'SELECT url FROM storage WHERE etag = ?',
    [etag]
  )

  if (!storage) {
    throw createError({
      statusCode: 404,
      statusMessage: 'File not found'
    })
  }

  const blob = await get(storage.url, { access: 'private' })

  if (!blob || blob.statusCode === 304 || !blob.stream) {
    throw createError({
      statusCode: 404,
      statusMessage: 'File not found'
    })
  }

  return new Response(blob.stream, {
    headers: {
      'Cache-Control': 'private, max-age=60',
      'Content-Length': String(blob.blob.size),
      'Content-Type': blob.blob.contentType,
      ETag: `"${blob.blob.etag}"`
    }
  })
})
