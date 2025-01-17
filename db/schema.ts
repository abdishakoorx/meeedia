import { integer, jsonb, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().default(10),
  lastTokenRefresh: timestamp().defaultNow(),
});

export const VIDEO_RAW_TABLE = pgTable("video_raw", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  videoID: varchar().notNull(),
  title: varchar({ length: 255 }).notNull(),
  description: jsonb(),
  videoType: varchar({ length: 255 }),
  createdBy: varchar().notNull().references(() => USER_TABLE.email),
});