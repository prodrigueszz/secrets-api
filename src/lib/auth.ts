import { betterAuth } from 'better-auth'
import { openAPI } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '../db/client'
import { argon2, randomUUID } from 'node:crypto'

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
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              id: randomUUID(),
            }
          }
        }
      }
    }
  },
  trustedOrigins: [
    "http://127.0.0.1"
  ],
  plugins: [
    openAPI()
  ] 
})
