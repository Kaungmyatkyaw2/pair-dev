"use server";

import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { editRoomById, getRoomById } from "@/services/room";
import { revalidatePath } from "next/cache";

export async function editRoomAction(
  roomId: string,
  roomData: Omit<Room, "id" | "userId">
) {
  const session = await getSession();

  if (!session) {
    throw new Error("You have to login first to perform this task!");
  }

  const room = await getRoomById(roomId);
  console.log(room?.userId, session.user.id);

  if (room?.userId !== session.user.id) {
    throw new Error("You can't edit other people's rooms.");
  }

  const editedRoom = await editRoomById({
    ...room,
    ...roomData,
    userId: room.userId,
  });

  revalidatePath("/my-rooms");
  revalidatePath("/rooms");
  revalidatePath(`/edit-room/${editedRoom[0].id}`);

  return editedRoom;
}
