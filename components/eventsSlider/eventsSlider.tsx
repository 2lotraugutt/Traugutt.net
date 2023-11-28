"use client";

import { getDate, getMonth, getYear, startOfToday } from "date-fns";
import { useEffect, useState } from "react";
import EventComponent from "./eventComponent";
import { Poppins } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence, easeInOut } from "framer-motion";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function EventsSlider() {
	const [events, setEvents] = useState<EventDataTypeWithPost[]>([]);
	const [dates, setDates] = useState<string[]>([]);
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
			const events: EventDataTypeWithPost[] = await (
				await fetch(`/api/calendar/events/?count=${count * 10}`, {
					method: "POST",
					body: data,
				})
			).json();

			let dates = [];

			for (const eventData of events) {
				dates.push(eventData.date.slice(3, 10));
			}

			setDates(Array.from(new Set(dates)));
			setEvents(events);
		}
	}, [count, day, month, year]);

	const monthsNames = ["Styczeń", "Luty", "Marzec", "Kwiecieć", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

	return (
		<AnimatePresence>
			{dates.length != 0 && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ ease: "circIn", duration: 0.5 }}
					className="w-screen 4xl:w-full flex gap-x-7 overflow-x-auto lg:-mx-12 -mx-2 md:-mx-5 4xl:mx-0 lg:px-12 px-2 md:px-5 4xl:px-0"
				>
					{dates.map((date, i) => (
						<div className="flex flex-col w-fit gap-y-3" key={date}>
							<p className={`sticky left-0 w-fit text-base xs:text-lg lg:text-xl ${poppingsFont700.className}`}>
								{monthsNames[parseInt(date.slice(0, 2)) - 1]} {date.slice(3, 8)}
							</p>

							<div className="flex gap-x-[15px]">
								{events
									.filter((event) => event.date.includes(date))
									.map((event) => (
										<EventComponent event={event} key={event.id} />
									))}
								{dates.length - 1 == i && (
									<button
										onClick={() => setCount((old) => old + 1)}
										className={`${
											events.length < count * 10 ? "hidden" : ""
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
				</motion.div>
			)}
		</AnimatePresence>
	);
}
