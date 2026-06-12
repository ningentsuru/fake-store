import { createClient } from '@libsql/client'

export const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN
})

export const db = {
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

  async execute(sql: string, args: any[] = []) {
    return await client.execute({
      sql,
      args
    })
  },

  async exists(sql: string, args: any[] = []): Promise<boolean> {
    const row = await this.one(sql, args)

    return row !== null
  }
}
