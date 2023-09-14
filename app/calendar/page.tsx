"use client";

import CalendarComponent from "@/components/calendar/calendarComponent";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMonth, getYear, startOfToday } from "date-fns";
import { Poppins } from "next/font/google";
import { useState } from "react";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});
const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});
const poppingsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});

export default function Page() {
	const [today, setToday] = useState<Date>(startOfToday());
	const [month, setMonth] = useState<number>(getMonth(startOfToday()));
	const [year, setYear] = useState<number>(getYear(startOfToday()));

	function changeMonth(up: boolean) {
		if (up) {
			if (month == 11) {
				setMonth(0);
				setYear((old) => old + 1);
			} else setMonth((old) => old + 1);
			setToday(new Date(year, month + 1, 2));
		} else {
			if (month == 0) {
				setMonth(11);
				setYear((old) => old - 1);
			} else setMonth((old) => old - 1);
			setToday(new Date(year, month - 1, 2));
		}
	}

	const weekDays = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];
	const monthsNames = ["Styczeń", "Luty", "Marzec", "Kwiecieć", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

	return (
		<div className="flex w-full flex-col lg:px-12 px-2 md:px-5 4xl:px-0 gap-y-3 sm:gap-y-5 xl:gap-y-7 3xl:gap-y-9 items-center">
			<h1
				className={`w-fit text-2xl xs:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl xl:mt-9 mb-6 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20 ${poppingsFont700.className}`}
			>
				Kalendarz
			</h1>

			<div className="mb-2 flex items-center w-full gap-x-4 justify-center lg:justify-start">
				<FontAwesomeIcon icon={faBackward} className="text-MainDarkGray/80 h-5" onClick={() => changeMonth(false)} />
				<h3 className={`text-left w-fit text-xl xs:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl ${poppingsFont600.className}`}>{monthsNames[month]}</h3>
				<FontAwesomeIcon icon={faForward} className="text-MainDarkGray/80 h-5" onClick={() => changeMonth(true)} />
			</div>

			<div className="flex gap-2 sm:gap-3.5 xl:gap-6 3xl:gap-10 text-MainDarkGray/60 w-full text-lg text-right pt-2 border-b-2">
				{weekDays.map((weekDay, i) => (
					<div className={`w-full hidden xl:block px-1 ${poppingsFont500.className}`} key={i}>
						{weekDay}
					</div>
				))}
			</div>

			<CalendarComponent today={today} month={month} year={year} />
		</div>
	);
}
