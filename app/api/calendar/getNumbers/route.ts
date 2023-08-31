import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
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
		where: { number: { not: undefined } },
	});

	return NextResponse.json(numbers);
}
