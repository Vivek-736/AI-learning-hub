import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { courseId, studyType } = await req.json();

  if (studyType === "ALL") {
    try {
      const [notes, contentList] = await Promise.all([
        db.select().from(CHAPTER_NOTES_TABLE)
          .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId)),
        db.select().from(STUDY_TYPE_CONTENT_TABLE)
          .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId))
      ]);

      // Normalize type comparison to lowercase
      return NextResponse.json({
        notes: notes,
        flashcard: contentList.filter(item => item.type.toLowerCase() === "flashcard"),
        quiz: null,
        qa: null
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch study content" },
        { status: 500 }
      );
    }
  }
  
  else if (studyType === "notes") {
    const notes = await db.select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));
    return NextResponse.json(notes);
  }

  return NextResponse.json(
    { error: "Invalid study type" },
    { status: 400 }
  );
}