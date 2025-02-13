import {
  boolean,
  integer,
  json,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
  id: serial().primaryKey(),
  userName: varchar().notNull(),
  email: varchar().notNull(),
  isMember: boolean().default(false),
});

export const STUDY_MATERIAL_TABLE = pgTable("study_materials", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  courseType: varchar().notNull(),
  topic: varchar().notNull(),
  difficultyLevel: varchar().default("Easy"),
  courseLayout: json(),
  createdBy: varchar().notNull(),
  status: varchar().default("Generating"),
});

export const CHAPTER_NOTES_TABLE = pgTable("chapter_notes", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  chapterId: integer().notNull(),
  studyMaterialId: integer().references(() => STUDY_MATERIAL_TABLE.id),
  notes: text(),
});