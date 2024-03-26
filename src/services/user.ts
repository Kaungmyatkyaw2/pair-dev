"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function deleteMyAccount() {
  const session = await getSession();

  if (!session) {
    throw new Error("You have to authenticate to perform this task.");
  }

  await db.delete(users).where(eq(users.id, session.user.id));
}
