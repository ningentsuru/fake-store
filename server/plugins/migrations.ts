import { runMigrations } from '@/../server/database/migrate'

export default defineNitroPlugin(async () => {
  await runMigrations()
  console.log('[DB] migrations executed')
})
