"use client";

import CalendarComponent from "@/components/calendar/calendarComponent";
import DatabaseTile from "@/components/calendar/databaseTile";
import DayTile from "@/components/calendar/dayTile";
import { endOfMonth, getDate, getDaysInMonth, getISODay, getMonth, getYear, startOfMonth, startOfToday } from "date-fns";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});
const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});
const poppingsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});

export default function Page() {
	const today = startOfToday();

	const month = getMonth(today);
	const year = getYear(today);

	const weekDays = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];

	return (
		<div className="flex">
			<div className="flex w-full flex-col p-12 gap-y-3 items-center">
				<h1 className={`w-fit text-7xl mt-9 mb-20 ${poppingsFont700.className}`}>Kalendarz</h1>
				<h3 className={`w-full text-left mb-2 text-5xl ${poppingsFont600.className}`}>Wrzesień</h3>

				<div className="flex gap-x-6 text-MainDarkGray/60 w-full text-lg text-right pt-2 border-b-2">
					{weekDays.map((weekDay) => (
						<div className={`w-full px-1 ${poppingsFont500.className}`} key={weekDay}>
							{weekDay}
						</div>
					))}
				</div>

				<CalendarComponent today={today} month={month} year={year} />
			</div>
		</div>
	);
}
