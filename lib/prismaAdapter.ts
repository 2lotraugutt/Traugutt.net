import { PrismaAdapter } from "@auth/prisma-adapter";
import { type Adapter } from "@auth/core/adapters";
import { PrismaClient } from "@prisma/client";

export function MyAdapter(prisma: PrismaClient): Adapter {
	return {
		...PrismaAdapter(prisma),

		async createUser(user: any) {
			return prisma.user.create({
				data: {
					name: user.name,
					email: user.email,
					profilePicture: user.image,
				},
			});
		},
	};
}
