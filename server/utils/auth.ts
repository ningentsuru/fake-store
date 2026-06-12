import type { H3Event } from '#imports'

export async function requireAuth(event: H3Event) {
  const session = await requireUserSession(event)

  return session.user
}
