import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { parse } from "date-fns";

export async function GET(request: NextRequest) {
	const after = request.nextUrl.searchParams.get("after");
	const before = request.nextUrl.searchParams.get("before");

	var dateAfter: undefined | Date = undefined;
	if (after) dateAfter = parse(after, "dd-MM-yyyy", new Date());
	var dateBefore: undefined | Date = undefined;
	if (before) dateBefore = parse(before, "dd-MM-yyyy", new Date());

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
			timeStamp: { gte: dateAfter, lte: dateBefore },
			number: { not: null },
		},
	});

	return NextResponse.json(numbers);
}
