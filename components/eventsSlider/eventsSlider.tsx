"use client";

import { getMonth, getYear, startOfToday } from "date-fns";
import { useEffect, useState } from "react";

export default function EventsSlider() {
	const [events, setEvents] = useState<EventDataType[]>([]);

	const month = getMonth(startOfToday());
	const year = getYear(startOfToday());

	useEffect(() => {
		fetchPost();
		async function fetchPost() {
			const events = await (await fetch(`/api/calendar/events/?month=${month}&year=${year}`)).json();

			setEvents(events);
		}
	}, []);

	return (
		<div className="w-full flex gap-x-[15px]">
			{events.map((event) => (
				<div key={event.id}>{event.name}</div>
			))}
		</div>
	);
}
