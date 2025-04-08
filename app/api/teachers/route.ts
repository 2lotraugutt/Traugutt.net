import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const teachers = await prisma.teacher.findMany({
		orderBy: [
			{ name: "asc" },
			{
				createdAt: "desc",
			},
		],
	});

	return NextResponse.json(teachers);
}
