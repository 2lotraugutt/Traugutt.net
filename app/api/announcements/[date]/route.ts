import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
		include: { author: true },
		where: { days: { every: { date: date } } },
	});

	return NextResponse.json(announcements);
}
