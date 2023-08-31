import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(request: NextRequest) {
	const month = parseInt(request.nextUrl.searchParams.get("month") || "0");
	const year = parseInt(request.nextUrl.searchParams.get("year") || "0");

	const numbers = await prisma.day.findMany({
		orderBy: [
			{
				timeStamp: "asc",
			},
		],
		include: { events: { include: { tag: true } } },
		where: {
			year: year != 0 ? year : undefined,
			month: month != 0 ? month : undefined,
		},
	});

	return NextResponse.json(numbers);
}
