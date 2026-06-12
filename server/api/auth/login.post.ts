import { db } from '@/../server/utils/db'
import type { UserResponse } from '@/types'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  const user = await db.one<UserResponse['user']>(
    'SELECT * FROM users WHERE email = ?',
    [email]
  )

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })
  }

  const valid = await verifyPassword(user.password_hash, password)

  if (!valid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  await setUserSession(event, {
    user: {
      id: user.id,
      email: user.email,
      display_name: user.display_name
    }
  })

  return { success: true }
})
