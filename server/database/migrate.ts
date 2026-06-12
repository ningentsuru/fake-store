import { client } from '@/../server/utils/db'

export async function runMigrations() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      display_name TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)
}
