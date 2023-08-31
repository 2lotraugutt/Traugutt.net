import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { zonedTimeToUtc } from "date-fns-tz";
import { endOfWeek, startOfToday, startOfWeek } from "date-fns";

export async function GET(request: NextRequest) {
	const beginning = zonedTimeToUtc(startOfWeek(startOfToday()), "UTC");
	const ending = zonedTimeToUtc(endOfWeek(startOfToday()), "UTC");

	const posts = await prisma.day.findMany({
		orderBy: [
			{
				timeStamp: "asc",
			},
		],
		select: {
			number: true,
			date: true,
		},
		where: { timeStamp: { gt: beginning, lt: ending } },
	});

	return NextResponse.json(posts);
}
