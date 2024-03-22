"use client";

import { faBell, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { differenceInCalendarDays, getDate, getMonth, getYear, startOfToday, parse } from "date-fns";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const plusJakartaSansFont700 = Plus_Jakarta_Sans({
	weight: "700",
	subsets: ["latin"],
});

const poppingsFont800 = Poppins({
	weight: "800",
	subsets: ["latin"],
});

export default function CalendarTile() {
	const [event, setEvent] = useState<EventDataTypeWithPost>();

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
			const event = await (
				await fetch(`/api/calendar/events/?count=1`, {
					method: "POST",
					body: data,
				})
			).json();

			setEvent(event[0]);
		}
	}, [day, year, month]);

	return (
		<Link
			href={"/calendar"}
			className="rounded-3xl md:col-span-1 xs:rounded-4xl gap-y-3 bg-MainDarkGray py-2 3xl:px-12 px-3 xl:items-start xl:px-8 flex flex-col items-center justify-around"
		>
			<div className="flex gap-2 flex-col sm:gap-5 2xl:gap-7 lg:flex-row lg:gap-5 items-center md:gap-3">
				<FontAwesomeIcon
					icon={faCalendarDays}
					className="text-white w-5 h-5 xs:w-10 xs:h-10 sm:w-14 sm:h-14 md:w-6 md:h-6 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14  2xl:h-14 3xl:w-16 3xl:h-16 4xl:w-[70px] 4xl:h-[70px]"
				/>

				<p
					className={`text-white text-xs 2xs:text-sm xl:text-xl lg:text-left md:text-lg text-center sm:text-2xl xs:text-lg 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl md:leading-7 ${poppingsFont800.className}`}
				>
					Kalendarz <br />
					wydarzeń
				</p>
			</div>

			{event && (
				<div className={`w-full xl:flex hidden gap-x-3 2xl:gap-x-5 flex-row items-center ${plusJakartaSansFont700.className}`}>
					<FontAwesomeIcon
						icon={faBell}
						className="text-MainDarkGray aspect-square bg-white h-5 w-5 2xl:w-7 2xl:h-7 3xl:w-9 2xl:p-2 4xl:p-3 3xl:h-9 4xl:w-10 4xl:h-10 p-1.5 rounded-full"
					/>

					<p className="flex flex-col text-white text-xs 2xl:text-sm w-full 3xl:text-base truncate 4xl:text-lg">
						{differenceInCalendarDays(parse(event.date, "dd-MM-yyyy", new Date()), startOfToday()) == 0
							? "Dzisiaj odbędzie się"
							: "Za " + differenceInCalendarDays(parse(event.date, "dd-MM-yyyy", new Date()), startOfToday()) + " dni odbędzię się"}
						<span className="text-sm 2xl:text-base 4xl:text-xl 3xl:text-lg text-MainColor truncate">{event.name}</span>
					</p>
				</div>
			)}
		</Link>
	);
}
