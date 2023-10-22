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
	const number: number = parseInt(data.get("number") as string);

	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.manageCalendar) {
			const dateDate = new Date(year, month, day);

			await prisma.day.upsert({
				where: { date: format(dateDate, "dd-MM-yyyy") },
				update: { number: number },
				create: {
					timeStamp: zonedTimeToUtc(dateDate, "UTC"),
					date: format(dateDate, "dd-MM-yyyy"),
					number: number,
					day,
					month,
					year,
				},
			});

			return NextResponse.json({ success: true });
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}
