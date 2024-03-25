import { db } from "@/db";
import { rooms } from "@/db/schema";
import { eq, like } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function getRooms(search: string | undefined) {
  unstable_noStore();
  const where = search ? like(rooms.tags, `%${search}%`) : undefined;
  const items = await db.query.rooms.findMany({ where });

  return items;
}

export async function getRoomById(roomId: string) {
  unstable_noStore();
  const item = await db.query.rooms.findFirst({ where: eq(rooms.id, roomId) });

  return item;
}
