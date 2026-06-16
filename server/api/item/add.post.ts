import { db } from '@/../server/utils/db'
import { requireAuth } from '@/../server/utils/auth'
import { UserResponse } from '@/types'
import { uploadStorageFile } from '@/../server/utils/storage'

export default eventHandler(async (event) => {
  const auth = (await requireAuth(event)) as UserResponse

  const form = await readFormData(event)
  const file = form.get('file')
  const name = String(form.get('name') ?? '').trim()
  const price = Number(form.get('price'))
  const description = String(form.get('description') ?? '').trim()

  if (!(file instanceof File)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No file provided'
    })
  }

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Item name is required'
    })
  }

  if (!Number.isFinite(price) || price < 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Item price is invalid'
    })
  }

  const uploaded = await uploadStorageFile(file)

  const item = await db.execute(
    `
    INSERT INTO items (user_id, storage_id, name, price, description)
    VALUES (?, ?, ?, ?, ?)
    `,
    [auth.id, uploaded.id, name, price, description]
  )

  return {
    success: true,
    id: Number(item.lastInsertRowid),
    storage_id: uploaded.id,
    etag: uploaded.etag,
    url: uploaded.url
  }
})
