import { generateNotes } from "@/configs/AIModel";
import { inngest } from "./client";
import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { event, body: "Hello, world!" };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: "create-new-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await step.run(
      "Check User and Create New if Not in the Database",
      async () => {
        const result = await db
          .select()
          .from(USER_TABLE)
          .where(
            eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress || "")
          );

        if (result.length === 0) {
          const userRes = await db
            .insert(USER_TABLE)
            .values({
              userName: user?.fullName || "",
              email: user?.primaryEmailAddress?.emailAddress || "",
            })
            .returning({ id: USER_TABLE.id });
          return userRes;
        }
        return result;
      }
    );
    return "Success";
  }
);

export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const notesResult = await step.run("Generate Chapter Notes", async() => {
      const Chapters = course?.courseLayout?.chapters;
      let index = 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Chapters.forEach(async(chapter: any) => {
        const PROMPT = `Generate exam material detail content for each chapter, make sure to includes all topic point in the content, make sure to give content in HTML format (Do not add HTML KL, Head, Body, title tag), The chapters : |` + JSON.stringify(chapter);
        const result = await generateNotes.sendMessage(PROMPT);
        const aiRes = result.response.text();

        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId: index,
          courseId: course?.courseId,
          notes: aiRes,
        });
        index = index + 1;
      });
      return "Completed";
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updateCourseStatusResult = await step.run("Update Course Status", async() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await db.update(STUDY_MATERIAL_TABLE).set({
        status: "Ready",
      }). where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
      return "Success";
    });
  }
);