"use server";

import { db } from "@/db";
import { Room, rooms } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, like } from "drizzle-orm";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function getRooms(search: string | undefined) {
  const where = search ? like(rooms.tags, `%${search}%`) : undefined;
  const items = await db.query.rooms.findMany({ where });

  return items;
}

export async function getMyRooms() {
  const session = await getSession();

  if (!session) {
    throw new Error("You have to authenticate to perform this task.");
  }

  const items = await db.query.rooms.findMany({
    where: eq(rooms.userId, session.user.id),
  });

  return items;
}

export async function getRoomById(roomId: string) {
  const item = await db.query.rooms.findFirst({ where: eq(rooms.id, roomId) });

  return item;
}

export async function deleteRoomById(roomId: string) {
  const session = await getSession();

  if (!session) {
    throw new Error("You have to authenticate to perform this task.");
  }

  const room = await getRoomById(roomId);

  if (room?.userId !== session.user.id) {
    throw new Error("You can't delete other people's rooms.");
  }

  await db.delete(rooms).where(eq(rooms.id, roomId));
  revalidatePath("/my-rooms");
}

export async function createRoom(roomData: Omit<Room, "id">) {
  try {
    return await db.insert(rooms).values(roomData).returning();
  } catch (error) {
    throw new Error("Something went wrong!");
  }
}

export async function editRoomById(roomData: Room) {
  try {
    const room = await db
      .update(rooms)
      .set(roomData)
      .where(eq(rooms.id, roomData.id))
      .returning();

    return room;
  } catch (error) {
    throw new Error("Something went wrong!");
  }
}
