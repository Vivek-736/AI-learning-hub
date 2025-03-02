import { generateNotes, GenerateQuiz, GenerateStudyTypeContent } from "@/configs/AIModel";
import { inngest } from "./client";
import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from "@/configs/schema";
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
        const PROMPT = `Generate detailed study material content for each chapter in HTML format, following a consistent structure: use <h1> with an emoji for the chapter title, provide an introduction with <p>, list key topics with <h2> and <ul> using emojis, include detailed explanations with <p> and <strong>, add examples with <pre> or <code>, highlight important notes with <strong> or <em>, and summarize exam focus areas with <h2> and <ul>; ensure the content is well-organized, visually appealing, and exam-focused, avoiding <html>, <head>, <body>, or <title> tags, for the chapters: ` + JSON.stringify(chapter);
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

export const GenerateStudyContent = inngest.createFunction(
  {id: "Generate Study Type Content"},
  {event: "studyType.content"},
  async ({event, step}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {studyType, prompt, courseId, recordId} = event.data;

    const AIResult = await step.run('Generating FlashCard using AI', async() => {
      const result = 
      studyType == "flashcard" ?
      await GenerateStudyTypeContent.sendMessage(prompt) :
      await GenerateQuiz.sendMessage(prompt);
      const aiRes = JSON.parse(result.response.text());
      return aiRes;
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const DbResult = await step.run("Save Result to DB", async() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await db.update(STUDY_TYPE_CONTENT_TABLE).set({
        content: AIResult,
        status: "Ready"
      }).where(
          eq(STUDY_TYPE_CONTENT_TABLE.id, recordId),
      );

      return "Data Inserted";
    })
  }
)