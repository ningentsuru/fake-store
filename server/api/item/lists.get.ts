import { db } from '@/../server/utils/db'

export default eventHandler(async (event) => {
  const items = await db.many(
    `
    SELECT
      items.*,
      storage.url,
      storage.etag
    FROM items
    JOIN storage ON items.storage_id = storage.id
    ORDER BY items.id DESC
    `
  )

  return {
    success: true,
    items
  }
})
