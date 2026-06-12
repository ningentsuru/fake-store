import type { H3Event } from 'h3'

export async function requireAuth(event: H3Event) {
  const session = await requireUserSession(event)

  return session.user
}
