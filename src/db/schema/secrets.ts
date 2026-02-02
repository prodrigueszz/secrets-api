import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { randomUUID } from "node:crypto";
import { users } from "./users";

export const secretsTable = pgTable("secrets", {
  id: uuid("id").primaryKey().$defaultFn(() => randomUUID()),
  userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
  siteName: text("site_name").notNull(),
  password: text("password").notNull(),
  identifier: text("identifier").notNull(),
})