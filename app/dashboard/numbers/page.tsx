"use client";

import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMonth, getYear, startOfToday } from "date-fns";
import { getSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NumbersCalendar from "./numbersCalendar";
const poppinsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});

export default function Page() {
	const [today, setToday] = useState<Date>(startOfToday());
	const [month, setMonth] = useState<number>(getMonth(startOfToday()));
	const [year, setYear] = useState<number>(getYear(startOfToday()));

	const currentYear = getYear(startOfToday());

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
	const weekDaysShort = ["Pn", "Wt", "Śr", "Czw", "Pt", "Sb", "Nd"];
	const monthsNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

	const router = useRouter();
	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			if (session) {
				if (session.user.role.manageNotifications || session.user.role.manageNumbers) {
				} else router.push("/dashboard");
			} else router.push("/");
		}
		initFunction();
	}, [router]);

	return (
		<div className="dashboard-page">
			<h1 className={`dashboard-heading poppinsFont700`}>Szczęśliwe numerki</h1>

			<div className="mb-2 flex items-center w-full gap-x-4 justify-center lg:justify-start">
				<FontAwesomeIcon icon={faBackward} className="text-MainDarkGray/80 h-5 hover:text-MainColor transition-all" onClick={() => changeMonth(false)} />
				<h3 className={`text-left w-fit text-xl xs:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl poppinsFont600`}>
					{monthsNames[month]} {currentYear != year ? <span className="text-base xs:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">{year}</span> : <></>}
				</h3>
				<FontAwesomeIcon icon={faForward} className="text-MainDarkGray/80 h-5 hover:text-MainColor transition-all" onClick={() => changeMonth(true)} />
			</div>

			<div className="flex gap-2 sm:gap-3.5 xl:gap-6 3xl:gap-10 text-MainDarkGray/60 w-full pb-1 md:pb-1.5 xl:pb-2 3xl:pb-2.5 border-b-2 3xl:border-b-[3px]">
				{weekDays.map((weekDay, i) => (
					<div className={`w-full hidden sm:block text-center lg:text-right px-1 text-xs md:text-sm xl:text-lg 2xl:text-xl 4xl:text-2xl poppinsFont500`} key={i}>
						{weekDay}
					</div>
				))}

				{weekDaysShort.map((weekDay, i) => (
					<div className={`w-full sm:hidden text-sm xs:text-base text-center poppinsFont500`} key={i}>
						{weekDay}
					</div>
				))}
			</div>
			<NumbersCalendar month={month} year={year} today={today} />
		</div>
	);
}
