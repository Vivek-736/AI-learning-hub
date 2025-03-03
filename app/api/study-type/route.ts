import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
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

      return NextResponse.json({
        notes: notes,
        flashcard: contentList.filter(item => item.type.toLowerCase() === "flashcard"),
        quiz: contentList.filter(item => item.type.toLowerCase() === "quiz")
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

  else {
    const result = await db.select().from(STUDY_TYPE_CONTENT_TABLE).where(and(eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId), eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)));

    return NextResponse.json(result[0]);
  }
}