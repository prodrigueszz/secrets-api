import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '../db/client'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    camelCase: false,
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60*60*24*7,
    updateAge: 60*60*24
  }
})
