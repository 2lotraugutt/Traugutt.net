import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { zonedTimeToUtc } from "date-fns-tz";
import { endOfWeek, startOfToday, startOfWeek } from "date-fns";

export async function GET(request: NextRequest) {
	const today = startOfToday();

	let beginning = zonedTimeToUtc(startOfWeek(today), "CEST");
	let ending = zonedTimeToUtc(endOfWeek(today), "CEST");

	const numbers = await prisma.day.findMany({
		orderBy: [
			{
				timeStamp: "asc",
			},
		],
		select: {
			number: true,
			date: true,
		},
		where: { timeStamp: { gt: beginning, lt: ending }, number: { not: null } },
	});

	return NextResponse.json(numbers);
}
