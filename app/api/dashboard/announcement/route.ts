import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { endOfYesterday } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;
	const count = parseInt(request.nextUrl.searchParams.get("count") || "0");

	const startOn = endOfYesterday();
	if (session) {
		if (session.user.role.addAnnouncements || session.user.role.manageAnnouncements) {
			const announcements = await prisma.announcement.findMany({
				take: count != 0 ? count : undefined,
				orderBy: [
					{
						createdAt: "desc",
					},
				],
				include: {
					author: true,
					publishedBy: true,
					days: {
						orderBy: { timeStamp: "asc" },
					},
				},
				where: {
					days: { some: { timeStamp: { gte: startOn } } },
				},
			});

			return NextResponse.json(announcements);
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

export async function POST(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.addAnnouncements || session.user.role.manageAnnouncements) {
			const data = await request.formData();

			const content: string = data.get("content") as string;
			const dates = data.getAll("dates[]") as string[];

			const toConnectOrCreate: any = [];
			dates.map((date) => {
				const day = parseInt(date.slice(0, 2));
				const month = parseInt(date.slice(3, 5)) - 1;
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
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

export async function DELETE(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.manageAnnouncements) {
			const data = await request.formData();

			const id: string = data.get("id") as string;

			await prisma.announcement.delete({
				where: { id },
			});

			return NextResponse.json({ success: true });
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

export async function PUT(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.manageAnnouncements) {
			const data = await request.formData();

			const id: string = data.get("id") as string;
			const content: string = data.get("content") as string;
			const dates = data.getAll("dates[]") as string[];

			const toConnectOrCreate: any = [];
			dates.map((date) => {
				const day = parseInt(date.slice(0, 2));
				const month = parseInt(date.slice(3, 5)) - 1;
				const year = parseInt(date.slice(6, 10));
				const dateDate = new Date(year, month, day);
				const timeStamp = zonedTimeToUtc(dateDate, "UTC");

				toConnectOrCreate.push({ create: { date, day, month, year, timeStamp }, where: { date } });
			});

			await prisma.announcement.update({
				where: { id },
				data: { content, days: { connectOrCreate: toConnectOrCreate } },
			});

			return NextResponse.json({ success: true });
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}
