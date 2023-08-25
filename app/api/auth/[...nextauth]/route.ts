import NextAuth, { Awaitable } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { MyAdapter } from "@/lib/prismaAdapter";
import prisma from "@/lib/prisma";

const handler = NextAuth({
	pages: {
		signIn: "/auth/signin",
		signOut: "/auth/signout",
	},
	adapter: MyAdapter(prisma),
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		FacebookProvider({
			clientId: process.env.FACEBOOK_ID as string,
			clientSecret: process.env.FACEBOOK_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),
		DiscordProvider({
			clientId: process.env.DISCORD_ID as string,
			clientSecret: process.env.DISCORD_SECRET as string,
		}),
	],
	callbacks: {
		async session({ session, token, user }): Promise<any> {
			session.user = user;
			return session;
		},
	},
});

export { handler as GET, handler as POST };
