export default defineEventHandler(async (event) => {
  const db = useDatabase('fakeStore')

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

  const existing = await db.sql`
    SELECT id
    FROM users
    WHERE email = ${email}
  `

  if (existing.rows.length) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Email already exists'
    })
  }

  const passwordHash = await hashPassword(password)

  const result = await db.sql`
    INSERT INTO users (
      email,
      password_hash,
      display_name
    )
    VALUES (
      ${email},
      ${passwordHash},
      ${displayName}
    )
    RETURNING id
  `

  const userId = result.rows[0].id

  await setUserSession(event, {
    user: {
      id: userId,
      email,
      displayName
    }
  })

  return {
    success: true
  }
})
