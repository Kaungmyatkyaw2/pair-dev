import { db } from "@/db";
import { rooms } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function getRooms() {
  unstable_noStore();
  const items = await db.query.rooms.findMany();

  return items;
}

export async function getRoomById(roomId: string) {
  unstable_noStore();
  const item = await db.query.rooms.findFirst({ where: eq(rooms.id, roomId) });

  return item;
}
