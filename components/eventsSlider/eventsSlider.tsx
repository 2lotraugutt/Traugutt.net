"use client";

import { getDate, getMonth, getYear, startOfToday } from "date-fns";
import { useEffect, useState } from "react";
import EventComponent from "./eventComponent";
import { Poppins } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEllipsis } from "@fortawesome/free-solid-svg-icons";

const poppingsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

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
		<div className="w-screen 4xl:w-full flex gap-x-[15px] overflow-x-auto hide-scrollbar lg:-mx-12 -mx-2 md:-mx-5 4xl:mx-0 lg:p-12 p-2 md:p-5 4xl:p-0">
			{events.map((event) => (
				<EventComponent event={event} key={event.id} />
			))}

			<button
				onClick={() => setCount((old) => old + 1)}
				className={`${events.length < count * 10 ? "hidden" : ""} flex rounded-3xl items-center border-[1px] border-MainPurple border-dotted p-7 gap-x-5`}
			>
				<p className={`text-2xl text-MainPurple bg-LightPurple rounded-full p-3.5 w-[60px] text-center ${poppingsFont700.className}`}>
					<FontAwesomeIcon icon={faEllipsis} />
				</p>

				<p className={`whitespace-nowrap text-lg ${poppingsFont700.className}`}>Zobacz więcej</p>
			</button>
		</div>
	);
}
