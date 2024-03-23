import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AuthOptions } from "next-auth";
import { DefaultSession, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GOOGLE_FONT_PROVIDER from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    GOOGLE_FONT_PROVIDER({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, token.email!),
      });

      if (!dbUser) {
        throw new Error("No user is found with this email!");
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name,
          email: token.email,
          image: token.picture,
        };
      }

      return session;
    },
  },
} satisfies AuthOptions;

export function getSession() {
  return getServerSession(authConfig);
}
