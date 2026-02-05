import { pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users.js";

export const secrets = pgTable("secrets", {
  id: text("id").primaryKey(),
  userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
  siteName: text("site_name").notNull(),
  password: text("password").notNull(),
  identifier: text("identifier").notNull(),
})

export const secretsRelations = relations(secrets, ({ one }) => ({
  users: one(users, {
    fields: [secrets.userId],
    references: [users.id]
  }),
}));

