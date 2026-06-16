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

  await client.execute(`
    CREATE TABLE IF NOT EXISTS storage (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      etag TEXT NOT NULL UNIQUE,
      url TEXT NOT NULL UNIQUE,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await client.execute(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id NUMBER,
      storage_id NUMBER,
      name TEXT,
      price NUMBER,
      description TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)
}
