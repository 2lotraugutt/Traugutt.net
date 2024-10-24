import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { date: string } }) {
	const count = parseInt(request.nextUrl.searchParams.get("count") || "0");

	const date = params.date;

	const announcements = await prisma.announcement.findMany({
		take: count != 0 ? count : undefined,
		orderBy: [
			{
				createdAt: "desc",
			},
		],
		include: {
			author: true,
			days: {
				orderBy: { timeStamp: "asc" },
			},
		},
		where: {
			AND: [
				{ days: { some: { date: date } } },
				{
					published: true,
				},
			],
		},
	});

	return NextResponse.json(announcements);
}
