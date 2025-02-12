import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";

export async function POST(req: Request) {
  const { createdBy } = await req.json();

  const result = await db
    .select()
    .from(STUDY_MATERIAL_TABLE)
    .where(eq(STUDY_MATERIAL_TABLE.createdBy, createdBy))
    .orderBy(desc(STUDY_MATERIAL_TABLE.id));

  return NextResponse.json({ result: result });
}

export async function GET(req: Request) {
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const id = searchParams?.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "courseId is required" },
      { status: 400 }
    );
  }

  const course = await db
    .select()
    .from(STUDY_MATERIAL_TABLE)
    .where(eq(STUDY_MATERIAL_TABLE.id, Number(id)));

  return NextResponse.json({ result: course[0] });
}