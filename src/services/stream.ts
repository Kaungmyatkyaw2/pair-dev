"use server";

import { getSession } from "@/lib/auth";
import { StreamChat } from "stream-chat";

export async function generateStreamToken() {
  const session = await getSession();

  if (!session) {
    throw new Error("No session found");
  }

  const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
  const secretKey = process.env.GET_STREAM_SECRET_KEY!;

  const serverClient = StreamChat.getInstance(apiKey, secretKey);
  const token = serverClient.createToken(session.user.id);
  return token;
}
