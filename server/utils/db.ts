import { createClient } from '@libsql/client'

export const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN
})

export const db = {
  // Execute a query and return the first row, or null if none.
  async one<T = Record<string, any>>(
    sql: string,
    args: any[] = []
  ): Promise<T | null> {
    const result = await client.execute({
      sql,
      args
    })

    return (result.rows[0] as T) ?? null
  },

  // Execute a query and return all resulting rows.
  async many<T = Record<string, any>>(
    sql: string,
    args: any[] = []
  ): Promise<T[]> {
    const result = await client.execute({
      sql,
      args
    })

    return result.rows as T[]
  },

  // Execute a query without transforming the result.
  async execute(sql: string, args: any[] = []) {
    return await client.execute({
      sql,
      args
    })
  },

  // Check whether a query returns at least one row.
  async exists(sql: string, args: any[] = []): Promise<boolean> {
    const row = await this.one(sql, args)

    return row !== null
  }
}
