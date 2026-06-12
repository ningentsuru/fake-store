import { db } from '@/../server/utils/db'
import type { User } from '@/../server/types/user'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  const user = await db.one<User>(
    `
    SELECT id, email, display_name, created_at
    FROM users
    WHERE id = ?
  `,
    [session.user.id]
  )

  return user
})
