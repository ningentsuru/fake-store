import { db } from '@/../server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const email = body.email?.trim().toLowerCase()
  const password = body.password
  const displayName = body.display_name?.trim()

  if (!email || !password || !displayName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing credentials'
    })
  }

  const existing = await db.exists('SELECT id FROM users WHERE email = ?', [
    email
  ])

  if (existing) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Email already exists'
    })
  }

  const passwordHash = await hashPassword(password)

  await db.execute(
    `
  INSERT INTO users (
    email,
    password_hash,
    display_name
  )
  VALUES (?, ?, ?)
  `,
    [email, passwordHash, displayName]
  )

  return {
    success: true
  }
})
