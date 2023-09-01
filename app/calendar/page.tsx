"use client";

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
	const [days, setDays] = useState<DayDataTypeWithEvents[]>([]);

	const today = startOfToday();

	const month = getMonth(today);
	const year = getYear(today);

	const monthBegining = startOfMonth(today);
	const monthEnding = endOfMonth(today);
	const firstDayOfMonth = getISODay(monthBegining) - 1;

	const monthLenght = getDaysInMonth(today);
	const prevMonthLastDay = getDate(endOfMonth(new Date(year, month - 1, 1)));
	const nextMonthDaysCount = 7 - getISODay(monthEnding);

	useEffect(() => {
		fetchPost();
		async function fetchPost() {
			const days = await (await fetch(`api/calendar/days?month=${month}&year=${year}`)).json();

			setDays(days);
		}
	}, []);

	const weekDays = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];

	return (
		<div className="flex">
			<div className="flex w-full flex-col p-12 gap-y-3 items-center">
				<h1 className={`w-fit text-7xl mt-9 mb-20 ${poppingsFont700.className}`}>Kalendarz</h1>
				<h3 className={`w-full text-left mb-2 text-5xl ${poppingsFont600.className}`}>Wrzesień</h3>

				<div className="flex gap-x-6 text-MainDarkGray/60 w-full text-lg text-right pt-2 border-b-2">
					{weekDays.map((weekDay) => (
						<div className={`w-full px-1 ${poppingsFont500.className}`}>{weekDay}</div>
					))}
				</div>

				<div className="grid grid-cols-7 w-full gap-6">
					{[...Array(firstDayOfMonth)].map((e, i) => {
						const dayNumber = prevMonthLastDay + (i - firstDayOfMonth + 1);
						const date = new Date(year, month - 1, dayNumber);

						return <DayTile differentMonth={true} date={date} key={date.toString()} />;
					})}

					{[...Array(monthLenght)].map((e, i) => {
						const dayNumber = i + 1;
						const filteredDays = days.filter((day) => day.day == dayNumber);
						const day = filteredDays.length == 0 ? undefined : filteredDays[0];

						if (day) return <DatabaseTile day={day} key={day.date} />;
						else {
							const date = new Date(year, month, dayNumber);
							return <DayTile differentMonth={false} date={date} key={date.toString()} />;
						}
					})}

					{[...Array(nextMonthDaysCount)].map((e, i) => {
						const dayNumber = i + 1;
						const date = new Date(year, month + 1, dayNumber);

						return <DayTile differentMonth={true} date={date} key={date.toString()} />;
					})}
				</div>
			</div>
		</div>
	);
}
