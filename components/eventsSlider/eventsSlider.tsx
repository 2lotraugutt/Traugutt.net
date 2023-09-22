"use client";

import { getDate, getMonth, getYear, startOfToday } from "date-fns";
import { useEffect, useState } from "react";
import EventComponent from "./eventComponent";

export default function EventsSlider() {
	const [events, setEvents] = useState<EventDataType[]>([]);
	const [count, setCount] = useState<number>(1);

	const day = getDate(startOfToday());
	const month = getMonth(startOfToday());
	const year = getYear(startOfToday());

	useEffect(() => {
		fetchPost();
		async function fetchPost() {
			const data = new FormData();
			data.set("day", day.toString());
			data.set("year", year.toString());
			data.set("month", month.toString());
			const events = await(
				await fetch(`/api/calendar/events/?count=${count * 10}`, {
					method: "POST",
					body: data,
				})
			).json();

			setEvents(events);
		}
	}, []);

	return (
		<div className="w-screen 4xl:w-full flex gap-x-[15px] overflow-x-auto hide-scrollbar lg:-mx-12 -mx-2 md:-mx-5 4xl:mx-0">
			{events.map((event, i) => (
				<EventComponent event={event} key={event.id} index={i} />
			))}
		</div>
	);
}
