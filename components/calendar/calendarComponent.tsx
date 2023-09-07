import { endOfMonth, getDate, getDaysInMonth, getISODay, startOfMonth } from "date-fns";
import DayTile from "./dayTile";
import DatabaseTile from "./databaseTile";
import { useEffect, useState } from "react";

export default function CalendarComponent(props: { today: Date; month: number; year: number }) {
	const [days, setDays] = useState<DayDataTypeWithEvents[]>([]);

	const monthBegining = startOfMonth(props.today);
	const monthEnding = endOfMonth(props.today);
	const firstDayOfMonth = getISODay(monthBegining) - 1;

	const monthLenght = getDaysInMonth(props.today);
	const prevMonthLastDay = getDate(endOfMonth(new Date(props.year, props.month - 1, 1)));
	const nextMonthDaysCount = 7 - getISODay(monthEnding);

	useEffect(() => {
		fetchPost();
		async function fetchPost() {
			const days = await (await fetch(`api/calendar/days?month=${props.month}&year=${props.year}`)).json();

			setDays(days);
		}
	}, [props.month, props.year]);

	return (
		<div className="grid grid-cols-7 w-full gap-6">
			{[...Array(firstDayOfMonth)].map((e, i) => {
				const dayNumber = prevMonthLastDay + (i - firstDayOfMonth + 1);
				const date = new Date(props.year, props.month - 1, dayNumber);

				return <DayTile differentMonth={true} date={date} key={date.toString()} />;
			})}

			{[...Array(monthLenght)].map((e, i) => {
				const dayNumber = i + 1;
				const filteredDays = days.filter((day) => day.day == dayNumber);
				const day = filteredDays.length == 0 ? undefined : filteredDays[0];

				if (day) return <DatabaseTile day={day} key={day.date} />;
				else {
					const date = new Date(props.year, props.month, dayNumber);
					return <DayTile differentMonth={false} date={date} key={date.toString()} />;
				}
			})}

			{[...Array(nextMonthDaysCount)].map((e, i) => {
				const dayNumber = i + 1;
				const date = new Date(props.year, props.month + 1, dayNumber);

				return <DayTile differentMonth={true} date={date} key={date.toString()} />;
			})}
		</div>
	);
}
