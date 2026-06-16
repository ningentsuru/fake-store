import { db } from '@/../server/utils/db'
import type { UserResponse } from '@/types'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  const user = await db.one<UserResponse>(
    `
    SELECT id, email, display_name, created_at
    FROM users
    WHERE id = ?
  `,
    [(session.user as UserResponse).id]
  )

  return user
})
