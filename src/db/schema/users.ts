import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from 'uuid'
import { accounts } from "./accounts.js";
import { secrets } from "./secrets.js";
import { sessions } from "./sessions.js";

export const users = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(() => uuidv7()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  encryptionSalt: text("encryption_salt").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  secretsTable: many(secrets),
  sessions: many(sessions),
  accounts: many(accounts),
}));