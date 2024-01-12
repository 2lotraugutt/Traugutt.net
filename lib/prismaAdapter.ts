import { PrismaAdapter } from "@auth/prisma-adapter";
import { type Adapter } from "@auth/core/adapters";
import { PrismaClient } from "@prisma/client";

export function MyAdapter(prisma: PrismaClient): Adapter {
	return {
		...PrismaAdapter(prisma),
		async createUser(user: any) {
			const fetchedUser: JustUserDataType = await prisma.user.create({
				data: {
					name: user.name,
					email: user.email,
					image: user.image,
				},
			});
			return fetchedUser;
		},

		async getSessionAndUser(sessionToken) {
			const userAndSession = await prisma.session.findUnique({
				where: { sessionToken },
				include: {
					user: {
						include: {
							role: true, // Include the user's role
						},
					},
				},
			});
			if (!userAndSession) return null;
			const { user, ...session } = userAndSession;
			return { user, session };
		},
	};
}
