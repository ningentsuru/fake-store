import { db } from '@/../server/utils/db'
import { createHash } from 'node:crypto'
import { put } from '@vercel/blob'
import { requireAuth } from '@/../server/utils/auth'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
])

const EXTENSIONS_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif'
}

export default eventHandler(async (event) => {
  await requireAuth(event)

  const form = await readFormData(event)
  const file = form.get('file')

  if (!(file instanceof File)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No file provided'
    })
  }

  if (file.size === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'File is empty'
    })
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw createError({
      statusCode: 415,
      statusMessage: 'Unsupported image type'
    })
  }

  if (file.size > MAX_FILE_SIZE) {
    throw createError({
      statusCode: 413,
      statusMessage: 'File is larger than 5 MB'
    })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const etag = createHash('md5').update(buffer).digest('hex')

  const existing = await db.one<{ url: string }>(
    'SELECT url FROM storage WHERE etag = ?',
    [etag]
  )

  if (existing?.url) {
    return {
      success: true,
      etag,
      url: existing.url
    }
  }

  const extension = EXTENSIONS_BY_TYPE[file.type]
  const uploaded = await put(`${file.type}/${etag}.${extension}`, buffer, {
    access: 'private',
    contentType: file.type
  })

  await db.execute(
    `
    INSERT INTO storage (
      etag,
      url
    )
    VALUES (?, ?)
    `,
    [etag, uploaded.url]
  )

  return {
    success: true,
    etag,
    url: uploaded.url
  }
})
