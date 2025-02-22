import { endOfMonth, getDate, getDaysInMonth, getISODay, startOfMonth } from "date-fns";

import { useEffect } from "react";
import DayTile from "./dayTile";
import NumberTile from "./numberTile";

export default function NumbersCalendar(props: {
	reFetch: Function;
	fetched: boolean;
	today: Date;
	month: number;
	year: number;
	numbers: { number: number; date: string }[];
}) {
	const monthBegining = startOfMonth(props.today);
	const monthEnding = endOfMonth(props.today);
	const firstDayOfMonth = getISODay(monthBegining) - 1;

	const monthLenght = getDaysInMonth(props.today);
	const prevMonthLastDay = getDate(endOfMonth(new Date(props.year, props.month - 1, 1)));
	const nextMonthDaysCount = 7 - getISODay(monthEnding);

	useEffect(() => {
		props.reFetch();
	}, [props.month, props.year]);

	if (props.fetched)
		return (
			<div className="grid grid-cols-5 xs:grid-cols-7 w-full gap-2 sm:gap-3.5 xl:gap-6 3xl:gap-10">
				{[...Array(firstDayOfMonth)].map((e, i) => {
					const dayNumber = prevMonthLastDay + (i - firstDayOfMonth + 1);

					return <DayTile isWeekend={false} day={dayNumber} key={dayNumber} />;
				})}
				{[...Array(monthLenght)].map((e, i) => {
					const dayNumber = i + 1;
					const filteredDays = props.numbers.filter((day) => parseInt(day.date.slice(0, 2)) == dayNumber);
					const day = filteredDays.length == 0 ? undefined : filteredDays[0];
					const date = new Date(props.year, props.month, dayNumber);

					return <NumberTile day={dayNumber} key={i} number={day?.number} date={date} reFetch={props.reFetch} />;
				})}
				{[...Array(nextMonthDaysCount)].map((e, i) => {
					const dayNumber = i + 1;

					return <DayTile isWeekend={false} day={dayNumber} key={dayNumber} />;
				})}
			</div>
		);
	else
		return (
			<div className="grid grid-cols-5 xs:grid-cols-7 w-full gap-2 sm:gap-3.5 xl:gap-6 3xl:gap-10">
				{[...Array(35)].map((e, i) => {
					return (
						<div
							key={i}
							className={`day-tile aspect-square lg:aspect-[5/4] animate-pulse ${i % 7 == 6 || i % 7 == 5 ? "bg-MediumGray/70 !hidden xs:!flex" : "bg-MediumGray/40"}`}
						>
							<div className={`day-number aspect-square bg-LightGray`}></div>
						</div>
					);
				})}
			</div>
		);
}
