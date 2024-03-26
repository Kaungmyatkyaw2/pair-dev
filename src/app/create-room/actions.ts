"use server";

import { Room, rooms } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { createRoom } from "@/services/room";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession();

  if (!session) {
    throw new Error("You have to login first to perform this task!");
  }

  const room = await createRoom({ ...roomData, userId: session.user.id });

  revalidatePath("/my-rooms");
  revalidatePath("/rooms");

  return room[0];
}
