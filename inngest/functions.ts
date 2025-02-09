import { inngest } from "./client";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
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

  //step is to send welcome notification and send notification after 3 days once user join it
);