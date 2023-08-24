import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
	const count = parseInt(request.nextUrl.searchParams.get("count") || "1");

	const posts = await prisma.post.findMany({
		take: count,
		orderBy: [
			{
				createdAt: "desc",
			},
		],
		where: { published: true },
	});

	return NextResponse.json(posts);
}
