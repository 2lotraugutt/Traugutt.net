const ldap = require("ldapjs");
import prisma from "@/lib/prisma";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Error from "next/error";

interface LDAPUser {
	name: string;
	email: string;
	userType: string;
}

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
			async authorize(credentials) {
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
					const ldapUser: LDAPUser = await searchUser(client, LDAPuser);

					var roleTag;
					if (ldapUser.userType == "Nauczyciele") {
						roleTag = "TEACHER";
					} else {
						roleTag = "STUDENT";
					}

					const createdUser: UserDataType = await prisma.user.create({
						data: {
							login,
							name: ldapUser.name,
							roleTag: roleTag,
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

const searchUser = (client: any, login: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		const searchOptions: any = {
			filter: `(userPrincipalName=${login})`,
			scope: "sub",
		};

		client.search("dc=traugutt,dc=lan", searchOptions, (error: any, res: any) => {
			if (error) {
				reject(error);
				return;
			}
			let user: any = null;

			res.on("searchEntry", (entry: any) => {
				const stringified = JSON.stringify(entry.pojo);
				const object = JSON.parse(stringified);
				const match = object.objectName.match(/CN=([^,]+),OU=([^,]+)/);
				const name = match[1];
				const userType = match[2];
				user = { name, userType };
			});

			res.on("end", (result: any) => {
				if (result.status === 0) {
					resolve(user);
				} else {
					resolve(null);
				}
			});

			res.on("error", (err: any) => {
				reject(err);
			});
		});
	});
};
