import { courseOutline } from "@/configs/AIModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { courseId, topic, courseType, difficultyLevel, createdBy } = await req.json();

  const PROMPT =
    "Generate a study material for " +
    topic +
    " for " +
    courseType +
    " and level of difficulty will be " +
    difficultyLevel +
    " with summary of course, List of Chapters along with summary for each chapter, Topic list in each chapter in JSON format";

  const aiRes = await courseOutline.sendMessage(PROMPT);
  const aiResult = JSON.parse(aiRes.response.text());

  const dbResult = await db
    .insert(STUDY_MATERIAL_TABLE)
    .values({
      courseId: courseId,
      courseType: courseType,
      createdBy: createdBy,
      topic: topic,
      courseLayout: aiResult,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .returning({ res: STUDY_MATERIAL_TABLE } as any);

  // console.log(dbResult);

  //Triggering the Inngest function

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await inngest.send({
    name: "notes.generate",
    data: {
      course: dbResult[0].res
    }
  });
  // console.log(result);

  return NextResponse.json({ result: dbResult[0] });
}