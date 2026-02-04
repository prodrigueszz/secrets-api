import { pgTable, text } from "drizzle-orm/pg-core";
import { randomUUID } from "node:crypto";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const secretsTable = pgTable("secrets", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
  siteName: text("site_name").notNull(),
  password: text("password").notNull(),
  identifier: text("identifier").notNull(),
})

export const secretsRelations = relations(secretsTable, ({ one }) => ({
  users: one(users, {
    fields: [secretsTable.userId],
    references: [users.id]
  }),
}));

