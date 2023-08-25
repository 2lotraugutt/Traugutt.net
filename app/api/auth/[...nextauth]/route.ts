import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";
import GoogleProvider from "next-auth/providers/google";
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
		InstagramProvider({
			clientId: process.env.INSTAGRAM_ID as string,
			clientSecret: process.env.INSTAGRAM_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),
	],
});

export { handler as GET, handler as POST };
