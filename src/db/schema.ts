import { pgTable, text } from "drizzle-orm/pg-core";

export const testSchema = pgTable("testing", {
  id: text("id").notNull().primaryKey(),
  name: text("named"),
});
