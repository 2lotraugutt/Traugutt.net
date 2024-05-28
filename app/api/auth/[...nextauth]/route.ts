const ldap = require("ldapjs");
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

				const LDAPuser = credentials.login.match(/[a-zA-Z0-9]*/)![0] + "@traugutt.lan";
				var login = credentials.login.match(/[a-zA-Z0-9]*/)![0];

				const client = ldap.createClient({
					url: process.env.LDAP_URI,
				});

				const bindUser = (client: any, LDAPuser: string, password: string) => {
					return new Promise((resolve) => {
						client.bind(LDAPuser, password, (error: Error) => {
							if (error) {
								resolve(true); // Authentication failed
							} else {
								resolve(false); // Authentication succeeded
							}
						});
					});
				};

				const fail = await bindUser(client, LDAPuser, credentials.password);
				if (fail) return null;

				const fetchedUser: UserDataType | null = await prisma.user.findUnique({
					where: { login },
					include: {
						role: true,
					},
				});

				if (fetchedUser) {
					return fetchedUser;
				} else {
					const createdUser: UserDataType = await prisma.user.create({
						data: {
							login,
							name: login,
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
