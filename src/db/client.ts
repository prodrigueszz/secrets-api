import { drizzle } from 'drizzle-orm/node-postgres'
import { env } from '../env'
import { schema } from './schema'
import 'dotenv/config'

export const db = drizzle(env.DATABASE_URL, {
  schema,
  casing: 'snake_case'
})