import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
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
		GitHubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
	],
});

export { handler as GET, handler as POST };
