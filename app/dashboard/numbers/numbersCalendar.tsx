import { endOfMonth, getDate, getDaysInMonth, getISODay, startOfMonth } from "date-fns";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { zonedTimeToUtc } from "date-fns-tz";
import DayTile from "./dayTile";
import NumberTile from "./numberTile";

export default function NumbersCalendar(props: { today: Date; month: number; year: number }) {
	const [days, setNumbers] = useState<{ number: number; date: string }[]>([]);
	const [fetched, setFetched] = useState<boolean>(false);

	const monthBegining = startOfMonth(props.today);
	const monthEnding = endOfMonth(props.today);
	const firstDayOfMonth = getISODay(monthBegining) - 1;

	const monthLenght = getDaysInMonth(props.today);
	const prevMonthLastDay = getDate(endOfMonth(new Date(props.year, props.month - 1, 1)));
	const nextMonthDaysCount = 7 - getISODay(monthEnding);

	useEffect(() => {
		fetchPost();
		async function fetchPost() {
			setFetched(false);
			const numbers = await (await fetch(`/api/calendar/getNumbers?month=${props.month}&year=${props.year}`)).json();

			setNumbers(numbers);
			setFetched(true);
		}
	}, [props.month, props.year]);

	if (fetched)
		return (
			<div className="grid grid-cols-7 w-full gap-2 sm:gap-3.5 xl:gap-6 3xl:gap-10">
				{[...Array(firstDayOfMonth)].map((e, i) => {
					const dayNumber = prevMonthLastDay + (i - firstDayOfMonth + 1);

					return <DayTile isWeekend={false} day={dayNumber} key={dayNumber} />;
				})}
				{[...Array(monthLenght)].map((e, i) => {
					const dayNumber = i + 1;
					const filteredDays = days.filter((day) => parseInt(day.date.slice(0, 2)) == dayNumber);
					const day = filteredDays.length == 0 ? undefined : filteredDays[0];
					const date = new Date(props.year, props.month, dayNumber);

					return <NumberTile day={dayNumber} key={i} number={day?.number} date={date} />;
				})}
				{[...Array(nextMonthDaysCount)].map((e, i) => {
					const dayNumber = i + 1;

					return <DayTile isWeekend={false} day={dayNumber} key={dayNumber} />;
				})}
			</div>
		);
	else
		return (
			<div className="grid grid-cols-7 w-full gap-2 sm:gap-3.5 xl:gap-6 3xl:gap-10">
				{[...Array(35)].map((e, i) => {
					return (
						<div key={i} className={`day-tile animate-pulse ${i % 7 == 6 || i % 7 == 5 ? "bg-MediumGray/70" : "bg-MediumGray/40"}`}>
							<div className={`day-number aspect-square bg-LightGray`}></div>
						</div>
					);
				})}
			</div>
		);
}
