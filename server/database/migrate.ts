import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { client } from '@/../server/utils/db'

export async function runMigrations() {
  const migrationsDir = resolve(process.cwd(), 'server/database/migrations')

  const files = ['001_users.sql']

  for (const file of files) {
    const path = resolve(migrationsDir, file)
    const sql = readFileSync(path, 'utf-8')

    console.log(`[DB] Running migration: ${file}`)

    await client.execute(sql)
  }

  console.log('[DB] Migrations complete')
}
