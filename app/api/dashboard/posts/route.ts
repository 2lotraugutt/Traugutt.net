import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
	const count = parseInt(request.nextUrl.searchParams.get("count") || "0");
	const user = request.nextUrl.searchParams.get("user");

	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (user != undefined || session.user.role.managePosts) {
			const posts = await prisma.post.findMany({
				take: count != 0 ? count : undefined,
				orderBy: [
					{
						createdAt: "desc",
					},
				],
				where: {
					authorId: user ?? undefined,
				},
				include: { author: true },
			});

			return NextResponse.json(posts);
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}
