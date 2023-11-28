import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { zonedTimeToUtc } from "date-fns-tz";

export async function GET(request: NextRequest) {
	const count = parseInt(request.nextUrl.searchParams.get("count") || "0");
	const search = request.nextUrl.searchParams.get("search") ?? "";
	const tags = [...request.nextUrl.searchParams.getAll("tag")];

	const events = await prisma.event.findMany({
		orderBy: [
			{
				day: { timeStamp: "asc" },
			},
		],
		take: count != 0 ? count : undefined,
		include: {
			tags: true,
			post: true,
		},
		where: {
			day: {
				timeStamp: { gte: zonedTimeToUtc(new Date(), "UTC") },
			},
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
			tags: { some: { id: { in: tags.length == 0 ? undefined : tags } } },
		},
	});

	return NextResponse.json(events);
}
