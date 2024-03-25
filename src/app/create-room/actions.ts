"use server";

import { db } from "@/db";
import { Room, rooms } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession();

  if (!session) {
    throw new Error("You have to login first to perform this task!");
  }

  await db
    .insert(rooms)
    .values({ ...roomData, userId: session?.user.id as string });

  revalidatePath("/");
}