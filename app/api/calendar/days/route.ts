import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const month = parseInt(request.nextUrl.searchParams.get("month") || "20");
	const year = parseInt(request.nextUrl.searchParams.get("year") || "0");

	const numbers = await prisma.day.findMany({
		orderBy: [
			{
				timeStamp: "asc",
			},
		],
		include: {
			events: { include: { tags: true, post: true } },
			announcements: {
				where: {
					published: true,
				},
			},
		},
		where: {
			year: year != 0 ? year : undefined,
			month: month != 20 ? month : undefined,
		},
	});

	return NextResponse.json(numbers);
}
