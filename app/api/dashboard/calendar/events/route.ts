import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { zonedTimeToUtc } from "date-fns-tz";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;
	const count = parseInt(request.nextUrl.searchParams.get("count") || "0");

	if (session) {
		if (session.user.role.manageCalendar) {
			const events = await prisma.event.findMany({
				take: count != 0 ? count : undefined,
				orderBy: [
					{
						day: { timeStamp: "desc" },
					},
					{
						createdAt: "desc",
					},
				],
				include: {
					tags: true,
					author: true,
				},
			});

			return NextResponse.json(events);
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

export async function POST(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.manageCalendar) {
			const data = await request.formData();
			const name: string = data.get("name") as string;
			const description: string = data.get("description") as string;
			const date: string = data.get("date") as string;
			const tags = data.getAll("tags[]") as string[];

			const tagsToConnect: { id: string }[] = tags.map((tag) => ({
				id: tag,
			}));

			const day = parseInt(date.slice(0, 2));
			const month = parseInt(date.slice(3, 5)) - 1;
			const year = parseInt(date.slice(6, 10));

			await prisma.day.upsert({
				where: { date: date },
				update: {},
				create: {
					day: day,
					year: year,
					month: month,
					timeStamp: zonedTimeToUtc(new Date(year, month, day), "UTC"),
					date: date,
				},
			});

			await prisma.event.create({
				data: {
					name: name,
					description: description,
					date: date,
					authorId: session.user.id,
					tags: {
						connect: tagsToConnect,
					},
				},
			});

			return NextResponse.json({ success: true });
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

export async function DELETE(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	const data = await request.formData();

	const id = data.get("id") as string;

	if (session) {
		if (session.user.role.manageCalendar) {
			const post = await prisma.event.delete({
				where: {
					id: id,
				},
			});

			return NextResponse.json({ success: true });
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}

export async function PUT(request: NextRequest) {
	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.manageCalendar) {
			const data = await request.formData();
			const id: string = data.get("id") as string;
			const name: string = data.get("name") as string;
			const description: string = data.get("description") as string;
			const date: string = data.get("date") as string;
			const tags = data.getAll("tags[]") as string[];

			const tagsToConnect: { id: string }[] = tags.map((tag) => ({
				id: tag,
			}));

			const day = parseInt(date.slice(0, 2));
			const month = parseInt(date.slice(3, 5)) - 1;
			const year = parseInt(date.slice(6, 10));

			await prisma.day.upsert({
				where: { date: date },
				update: {},
				create: {
					day: day,
					year: year,
					month: month,
					timeStamp: zonedTimeToUtc(new Date(year, month, day), "UTC"),
					date: date,
				},
			});

			await prisma.event.update({
				where: { id },
				data: {
					name: name,
					description: description,
					date: date,
					authorId: session.user.id,
					tags: {
						connect: tagsToConnect,
					},
				},
			});

			return NextResponse.json({ success: true });
		} else return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
	} else return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
}
