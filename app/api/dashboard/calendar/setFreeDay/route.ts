import { da } from "date-fns/locale";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { format, zonedTimeToUtc } from "date-fns-tz";

export async function PUT(request: NextRequest) {
	const data = await request.formData();

	const day: number = parseInt(data.get("day") as string);
	const month: number = parseInt(data.get("month") as string);
	const year: number = parseInt(data.get("year") as string);
	const state: boolean = data.get("state") == "true" ? true : false;

	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.manageCalendar) {
			const posts = await prisma.day.upsert({
				create: {
					date: format(new Date(year, month, day), "dd-MM-yyyy"),
					day: day,
					month: month,
					year: year,
					freeDay: state,
					timeStamp: zonedTimeToUtc(new Date(year, month, day), "UTC"),
				},
				update: { freeDay: state },
				where: {
					date: format(new Date(year, month, day), "dd-MM-yyyy"),
				},
			});

			return NextResponse.json(posts);
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}
