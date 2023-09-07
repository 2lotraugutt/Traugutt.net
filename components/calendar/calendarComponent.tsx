import { endOfMonth, getDate, getDaysInMonth, getISODay, startOfMonth } from "date-fns";
import DayTile from "./dayTile";
import DatabaseTile from "./databaseTile";
import { useEffect, useState } from "react";

export default function CalendarComponent(props: { today: Date; month: number; year: number }) {
	const [days, setDays] = useState<DayDataTypeWithEvents[]>([]);
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
			const days = await (await fetch(`api/calendar/days?month=${props.month}&year=${props.year}`)).json();

			setDays(days);
			setFetched(true);
		}
	}, [props.month, props.year]);

	if (fetched)
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
	else
		return (
			<div className="grid grid-cols-7 w-full gap-6">
				{[...Array(35)].map((e, i) => {
					return (
						<div key={i} className={`aspect-[14/15] p-3.5 rounded-3xl animate-pulse ${i % 7 == 6 || i % 7 == 5 ? "bg-MediumGray/70" : "bg-MediumGray/40"}`}>
							<div className={`p-1.5 text-center w-10 h-10 rounded-full text-xl bg-LightGray`}></div>
						</div>
					);
				})}
			</div>
		);
}

