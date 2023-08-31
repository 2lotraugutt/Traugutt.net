"use client";

import DatabaseTile from "@/components/calendar/databaseTile";
import DifferentMonthTile from "@/components/calendar/differentMonthTile";
import NormalTile from "@/components/calendar/normalTile";
import { endOfMonth, getDate, getDaysInMonth, getISODay, getMonth, getYear, startOfMonth, startOfToday } from "date-fns";
import { useEffect, useState } from "react";

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
			<div className="flex w-full flex-col p-12 gap-y-3">
				{/* <div className="flex gap-x-6">
					{weekDays.map((weekDay) => (
						<div className="text-right grow px-3">{weekDay}</div>
					))}
				</div> */}

				<div className="grid grid-cols-7 gap-6">
					{[...Array(firstDayOfMonth)].map((e, i) => {
						const dayNumber = prevMonthLastDay + (i - firstDayOfMonth + 1);
						return <DifferentMonthTile dayNumber={dayNumber} />;
					})}

					{[...Array(monthLenght)].map((e, i) => {
						const dayNumber = i + 1;
						const filteredDays = days.filter((day) => day.day == dayNumber);
						const day = filteredDays.length == 0 ? undefined : filteredDays[0];

						if (day) return <DatabaseTile day={day} />;
						else {
							const date = new Date(year, month, dayNumber);
							return <NormalTile date={date} />;
						}
					})}

					{[...Array(nextMonthDaysCount)].map((e, i) => {
						const dayNumber = i + 1;
						return <DifferentMonthTile dayNumber={dayNumber} />;
					})}
				</div>
			</div>
		</div>
	);
}
