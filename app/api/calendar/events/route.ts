import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { zonedTimeToUtc } from "date-fns-tz";
import { getTime } from "date-fns";

export async function POST(request: NextRequest) {
	const count = parseInt(request.nextUrl.searchParams.get("count") || "0");

	const data = await request.formData();

	const day: string = data.get("day") as string;
	const month: string = data.get("month") as string;
	const year: string = data.get("year") as string;

	const date = zonedTimeToUtc(new Date(parseInt(year), parseInt(month), parseInt(day)), "CEST");

	const numbers = await prisma.event.findMany({
		orderBy: [
			{
				day: { timeStamp: "asc" },
			},
		],
		take: count != 0 ? count : undefined,
		include: { tags: true },
		where: {
			day: {
				timeStamp: { gte: date },
			},
		},
	});

	return NextResponse.json(numbers);
}
