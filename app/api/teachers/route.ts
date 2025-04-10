import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const count = parseInt(request.nextUrl.searchParams.get("count") || "0");

	const teachers = await prisma.teacher.findMany({
		take: count != 0 ? count : undefined,
		orderBy: [
			{ lastName: "asc" },
			{ name: "asc" },
			{
				createdAt: "desc",
			},
		],
	});

	return NextResponse.json(teachers);
}
