import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
	const count = parseInt(request.nextUrl.searchParams.get("count") || "0");
	const search = request.nextUrl.searchParams.get("search") ?? "";

	const posts = await prisma.post.findMany({
		orderBy: {
			createdAt: "desc",
		},

		take: count != 0 ? count : undefined,
		include: {
			event: true,
		},
		where: {
			OR: [
				{
					content: {
						mode: "insensitive",
						contains: search?.trim() == "" ? "" : search,
					},
				},
				{
					title: {
						mode: "insensitive",
						contains: search?.trim() == "" ? "" : search,
					},
				},
				{
					author: {
						name: {
							mode: "insensitive",
							contains: search?.trim() == "" ? "" : search,
						},
					},
				},
			],
		},
	});

	const events = await prisma.event.findMany({
		orderBy: {
			createdAt: "desc",
		},

		take: count != 0 ? count : undefined,
		include: { post: true },
		where: {
			OR: [
				{
					name: {
						mode: "insensitive",
						contains: search?.trim() == "" ? "" : search,
					},
				},
				{
					description: {
						mode: "insensitive",
						contains: search?.trim() == "" ? "" : search,
					},
				},
			],
		},
	});

	return NextResponse.json({ posts, events });
}
