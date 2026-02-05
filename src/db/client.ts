import { drizzle } from 'drizzle-orm/node-postgres'
import { env } from '../env.js'
import 'dotenv/config'
import { schema } from './schema/index.js'

export const db = drizzle(env.DATABASE_URL, {
  schema,
  casing: 'snake_case'
})