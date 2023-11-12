import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDate, getMonth, startOfToday } from "date-fns";
import { getYear } from "date-fns/fp";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import EventComponent from "../eventsSlider/eventComponent";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function EventsList() {
	const [events, setEvents] = useState<EventDataType[]>([]);
	const [eventsCount, setEventsCount] = useState<number>(1);
	const [fetched, setFetched] = useState<boolean>(false);
	const [dates, setDates] = useState<string[]>([]);

	useEffect(() => {
		fetchEvents();
	}, []);

	const day = getDate(startOfToday());
	const month = getMonth(startOfToday());
	const year = getYear(startOfToday());

	async function fetchEvents() {
		const data = new FormData();
		data.set("day", day.toString());
		data.set("year", year.toString());
		data.set("month", month.toString());
		const returnedEvents: EventDataType[] = await (
			await fetch(`/api/calendar/events/?count=${eventsCount * 50}`, {
				method: "POST",
				body: data,
			})
		).json();

		let dates = [];

		for (const eventData of returnedEvents) {
			dates.push(eventData.date.slice(3, 10));
		}

		setEvents(returnedEvents);
		setEventsCount((oldCount) => oldCount + 1);
		setDates(Array.from(new Set(dates)));
		setFetched(true);
	}

	const monthsNames = ["Styczeń", "Luty", "Marzec", "Kwiecieć", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

	if (fetched) {
		return (
			<div className="flex flex-col w-3/5 mx-auto gap-y-12">
				{dates.map((date, i) => (
					<div className="flex flex-col gap-y-3 w-full" key={date}>
						<p className={`text-base xs:text-lg lg:text-xl ${poppingsFont700.className}`}>
							{monthsNames[parseInt(date.slice(0, 2)) - 1]} {date.slice(3, 8)}
						</p>

						<div className="flex flex-col w-full gap-y-3">
							{events
								.filter((event) => event.date.includes(date))
								.map((event) => (
									<EventComponent event={event} key={event.id} />
								))}
							{dates.length - 1 == i && (
								<button
									onClick={() => setEventsCount((old) => old + 1)}
									className={`${
										events.length < eventsCount * 10 ? "hidden" : ""
									} flex rounded-3xl items-center border-[1px] border-SecondColor border-dotted p-3.5 lg:p-7 gap-x-5`}
								>
									<p
										className={`w-[48px] sm:w-[52px] text-lg sm:text-xl lg:text-2xl text-SecondColor bg-LightColor rounded-full p-2.5 sm:p-3 lg:p-3.5 lg:w-[60px] text-center ${poppingsFont700.className}`}
									>
										<FontAwesomeIcon icon={faEllipsis} />
									</p>

									<p className={`whitespace-nowrap text-sm sm:text-base lg:text-lg ${poppingsFont700.className}`}>Zobacz więcej</p>
								</button>
							)}
						</div>
					</div>
				))}
			</div>
		);
	} else {
		return (
			<div className="flex flex-col w-3/5 mx-auto gap-y-3">
				{[...Array(10)].map((n, i: number) => (
					<div key={i} className={`flex rounded-3xl items-center border-[1px] border-SecondColor border-dotted p-3.5 lg:p-7 gap-x-3 sm:gap-x-4 lg:gap-x-5`}>
						<div className={`w-[48px] animate-pulse sm:w-[52px] text-SecondColor bg-LightColor rounded-full lg:w-[60px] aspect-square`}></div>

						<div className="flex flex-col gap-y-1.5">
							<div className={`h-3 sm:h-5 lg:h-6 rounded-lg w-60 bg-LightGray`}></div>

							<div className="flex gap-x-2">
								{[...Array((i % 3) + 1)].map((m, j) => (
									<div key={i * j} className={`flex h-fit rounded-3xl py-1 gap-x-2 px-2 sm:px-3 bg-LightGray/30 items-center`}>
										<div className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-MainDarkGray/20`} />

										<div className={`h-2 w-14 rounded-md bg-MainDarkGray/30 sm:h-2.5 md:h-3.5`}></div>
									</div>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}
}
