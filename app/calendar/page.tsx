"use client";

import { differenceInDays, endOfMonth, endOfWeek, getDate, getDay, getDaysInMonth, getISODay, getMonth, getYear, startOfMonth, startOfToday } from "date-fns";
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
						return <div className="aspect-[14/15] border-[1.5px] rounded-3xl border-dashed border-MainDarkGray bg-MainDarkGray/20">{dayNumber}</div>;
					})}
					{[...Array(monthLenght)].map((e, i) => {
						const dayNumber = i + 1;
						const filteredDays = days.filter((day) => day.day == dayNumber);
						const day = filteredDays.length == 0 ? undefined : filteredDays[0];

						return <div className="bg-white aspect-[14/15] border-[1.5px] rounded-3xl border-dashed border-MainPurple">{day?.number}</div>;
					})}
					{[...Array(7 - ((monthLenght + firstDayOfMonth) % 7))].map((e, i) => {
						const dayNumber = i + 1;

						return <div className="aspect-[14/15] border-[1.5px] rounded-3xl border-dashed border-MainDarkGray bg-MainDarkGray/20">{dayNumber}</div>;
					})}
				</div>
			</div>
		</div>
	);
}
