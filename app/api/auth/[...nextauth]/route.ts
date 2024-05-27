import prisma from "@/lib/prisma";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
	pages: {
		signIn: "/auth/signin",
		signOut: "/auth/signout",
	},
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			credentials: {
				login: { label: "login", type: "text", placeholder: "" },
				password: { label: "password", type: "password" },
			},

			async authorize(credentials, req) {
				credentials = credentials as Record<"login" | "password", string>;

				if (credentials.password == "undefined" || credentials.login == "undefined") return null;

				// TODO
				// Add logic here to look up the user from the credentials supplied
				const user = { name: "WWW Smith", email: "jsmith@example.com" };

						const fetchedUser: UserDataType | null = await prisma.user.findUnique({
							where: { login: credentials!.login },
							include: {
								role: true,
							},
						});

						if (fetchedUser) {
							return fetchedUser;
						} else {
							const createdUser: UserDataType = await prisma.user.create({
								data: {
									login: credentials!.login,
									name: user.name,
								},
								include: {
									role: true,
								},
							});
							return createdUser;
						}
			},
		}),
	],
	session: { strategy: "jwt" },
	callbacks: {
		session({ session, token }) {
			return {
				...session,
				user: {
					...(token.user as UserDataType),
					id: token.sub,
				},
			};
		},
		jwt({ token, user }) {
			if (!!user) token.user = user;
			return token;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
