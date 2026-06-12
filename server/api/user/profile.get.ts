export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  const db = useDatabase()

  const result = await db.sql`
    SELECT
      id,
      email,
      display_name,
      created_at
    FROM users
    WHERE id = ${session.user.id}
  `

  return result.rows[0]
})
