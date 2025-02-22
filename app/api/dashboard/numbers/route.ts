import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { addDays, format, getDate, getMonth, getYear, isWeekend } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import fs from "fs";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const dataFilePath = path.join(process.cwd(), "lucky_numbers.json");

let leftNumbers: number[] = Array.from({ length: 35 }, (v, k) => k + 1);

try {
	const data = fs.readFileSync(dataFilePath, "utf8");
	leftNumbers = JSON.parse(data);
} catch (error) {
	console.error("Error reading data file:", error);
}

async function GenerateNumbers(startDate: Date, endDate: Date) {
	let currentDate = startDate;
	while (currentDate <= endDate) {
		if (!isWeekend(currentDate)) {
			if (leftNumbers.length == 0) leftNumbers = Array.from({ length: 35 }, (v, k) => k + 1);

			const randomNumber = Math.floor(Math.random() * leftNumbers.length);
			const generatedNumber = leftNumbers[randomNumber];

			const dayDate = zonedTimeToUtc(currentDate, "UTC");
			const formattedDate = format(dayDate, "dd-MM-yyyy");

			try {
				await prisma.day.upsert({
					where: { date: formattedDate, freeDay: false },
					update: { number: generatedNumber },
					create: {
						timeStamp: dayDate,
						date: formattedDate,
						number: generatedNumber,
						day: getDate(dayDate),
						month: getMonth(dayDate),
						year: getYear(dayDate),
					},
				});
				leftNumbers.splice(randomNumber, 1);
			} catch (error) {
				console.error("Error saving number:", error);
			}
		}
		currentDate = addDays(currentDate, 1); // Move to next day
	}
	fs.writeFileSync(dataFilePath, JSON.stringify(leftNumbers), "utf8");
}

export async function POST(request: NextRequest) {
	const data = await request.formData();

	const startDateStr: string = data.get("start_date") as string;
	const endDateStr: string = data.get("end_date") as string;

	// Parse dates from the request
	const startDate = new Date(startDateStr.split("-").reverse().join("-")); // dd-mm-yyyy -> yyyy-mm-dd
	const endDate = new Date(endDateStr.split("-").reverse().join("-")); // dd-mm-yyyy -> yyyy-mm-dd

	const session = (await getServerSession(authOptions)) as SessionDataType | undefined;

	if (session) {
		if (session.user.role.manageCalendar) {
			await GenerateNumbers(startDate, endDate);
			return NextResponse.json({ success: true });
		} else {
			return NextResponse.json({ error: "You are not allowed to do this. Permissions exceeded" }, { status: 500 });
		}
	} else {
		return NextResponse.json({ error: "You are not logged in" }, { status: 500 });
	}
}
