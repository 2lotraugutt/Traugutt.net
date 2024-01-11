import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { zonedTimeToUtc } from "date-fns-tz";

export async function POST(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session && session.user.verified) {
		const data = await request.formData();

		const content: string = data.get("content") as string;
		const dates = data.getAll("dates[]") as string[];

		const toConnectOrCreate: any = [];
		dates.map((date) => {
			const day = parseInt(date.slice(0, 2));
			const month = parseInt(date.slice(3, 5));
			const year = parseInt(date.slice(6, 10));
			const dateDate = new Date(year, month, day);
			const timeStamp = zonedTimeToUtc(dateDate, "UTC");

			toConnectOrCreate.push({ create: { date, day, month, year, timeStamp }, where: { date } });
		});

		await prisma.announcement.create({
			data: {
				days: { connectOrCreate: toConnectOrCreate },
				content: content,
				authorId: session.user.id,
			},
		});

		return NextResponse.json({ success: true });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}
