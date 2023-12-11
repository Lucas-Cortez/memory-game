import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prismaClient } from "./prisma";
import { Errors } from "enum/errors";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: "text", label: "Username" },
      },

      async authorize(credentials) {
        const { username } = credentials as { username: string };

        const newUser = await prismaClient.user.create({ data: { username } });

        return { username: newUser.username, id: newUser.user_id };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }

      return token;
    },

    async session({ session, token }) {
      if (token.username && token.id) {
        session.user = {
          username: token.username as string,
          id: token.id as string,
        };
      }

      return session;
    },
  },
};
