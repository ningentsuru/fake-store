export default defineEventHandler(async (event) => {
  const db = useDatabase('fakeStore')

  const { email, password } = await readBody(event)

  const result = await db.sql`
    SELECT *
    FROM users
    WHERE email = ${email.toLowerCase()}
  `

  const user = result.rows[0]

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })
  }

  const valid = await verifyPassword(user.password_hash, password)

  if (!valid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })
  }

  await setUserSession(event, {
    user: {
      id: user.id,
      email: user.email,
      displayName: user.display_name
    }
  })

  return {
    success: true
  }
})
