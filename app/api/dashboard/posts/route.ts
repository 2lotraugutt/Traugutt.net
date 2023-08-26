import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
	const count = parseInt(request.nextUrl.searchParams.get("count") || "0");
	const user = request.nextUrl.searchParams.get("user");

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
}
