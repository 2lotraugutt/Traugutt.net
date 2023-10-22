import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
	const year = parseInt(request.nextUrl.searchParams.get("year") || "0");
	const month = parseInt(request.nextUrl.searchParams.get("month") || "20");
	const day = parseInt(request.nextUrl.searchParams.get("day") || "0");

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
		where: {
			number: { not: null },
			year: year != 0 ? year : undefined,
			day: day != 0 ? day : undefined,
			month: month != 20 ? month : undefined,
		},
	});

	return NextResponse.json(numbers);
}
