import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { USER_TABLE, STUDY_MATERIAL_TABLE, CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE, INVOICE_TABLE } from "@/configs/schema";
import { eq, count } from "drizzle-orm";

export async function POST() {
  try {
    const users = await db.select().from(USER_TABLE);

    const analyticsData = {
      users: [] as Array<{
        id: number;
        userName: string;
        email: string;
        isMember: boolean;
        customerId?: string;
        studyMaterialsCount: number;
        chapterNotesCount: number;
        invoicesCount: number;
      }>,
      totalStudyMaterials: 0,
      totalChapterNotes: 0,
      totalStudyTypeContents: 0,
      totalInvoices: 0,
      difficultyDistribution: [] as Array<{ name: string; count: number }>,
    };

    const difficultyCounts: Record<string, number> = {};

    for (const user of users) {
      const studyMaterials = await db
        .select()
        .from(STUDY_MATERIAL_TABLE)
        .where(eq(STUDY_MATERIAL_TABLE.createdBy, user.email));

      const chapterNotesCountResult = await db
        .select({ count: count() })
        .from(CHAPTER_NOTES_TABLE)
        .where(
          studyMaterials.length > 0
            ? eq(CHAPTER_NOTES_TABLE.courseId, studyMaterials[0].courseId)
            : eq(CHAPTER_NOTES_TABLE.courseId, "")
        );

      const studyTypeContentsCountResult = await db
        .select({ count: count() })
        .from(STUDY_TYPE_CONTENT_TABLE)
        .where(
          studyMaterials.length > 0
            ? eq(STUDY_TYPE_CONTENT_TABLE.courseId, studyMaterials[0].courseId)
            : eq(STUDY_TYPE_CONTENT_TABLE.courseId, "")
        );

      const invoicesCountResult = await db
        .select({ count: count() })
        .from(INVOICE_TABLE)
        .where(eq(INVOICE_TABLE.customerId, user.customerId || ""));

      studyMaterials.forEach((material) => {
        const difficulty = material.difficultyLevel;
        if (difficulty !== null) {
          difficultyCounts[difficulty] = (difficultyCounts[difficulty] || 0) + 1;
        }
      });

      analyticsData.users.push({
        id: user.id,
        userName: user.userName,
        email: user.email,
        isMember: user.isMember ?? false,
        customerId: user.customerId ?? undefined,
        studyMaterialsCount: studyMaterials.length,
        chapterNotesCount: chapterNotesCountResult[0]?.count || 0,
        invoicesCount: invoicesCountResult[0]?.count || 0,
      });

      analyticsData.totalStudyMaterials += studyMaterials.length;
      analyticsData.totalChapterNotes += chapterNotesCountResult[0]?.count || 0;
      analyticsData.totalStudyTypeContents += studyTypeContentsCountResult[0]?.count || 0;
      analyticsData.totalInvoices += invoicesCountResult[0]?.count || 0;
    }
    analyticsData.difficultyDistribution = Object.entries(difficultyCounts).map(([name, count]) => ({
      name,
      count,
    }));

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}