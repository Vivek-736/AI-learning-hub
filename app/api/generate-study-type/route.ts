import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { chapters, courseId, type } = await req.json();

  const PROMPT = type == "flashcard" ?
    "Generate the flashcard on topic : " +
    chapters +
    " in JSON format with only front and back content, Maximum 15" : 
    "Generate Quiz on topics : " + chapters + " with Question and options along with correct answer in JSN format, (Max 10)";

  const result = await db
    .insert(STUDY_TYPE_CONTENT_TABLE)
    .values({
      courseId: courseId,
      type: type,
    })
    .returning({ id: STUDY_TYPE_CONTENT_TABLE.id });

  inngest.send({
    name: "studyType.content",
    data: {
      studyType: type,
      prompt: PROMPT,
      courseId: courseId,
      recordId: result[0].id,
    },
  });

  return NextResponse.json(result[0].id);
}