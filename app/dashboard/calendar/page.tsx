"use client";

import { getDaysInMonth, getISODay, getYear, startOfMonth, startOfToday } from "date-fns";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});
const poppingsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});

export default function Page() {
	const [days, setDays] = useState<DayDataTypeWithEvents[]>([]);

	const today = startOfToday();
	const year = getYear(today);

	useEffect(() => {
		fetchPost();
	}, [year]);
	async function fetchPost() {
		const days = await (await fetch(`/api/calendar/days?year=${year}`)).json();

		setDays(days);
	}

	const monthsNames = ["Styczeń", "Luty", "Marzec", "Kwiecieć", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
	return (
		<div className="dashboard-page">
			<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Wydarzenia</h1>
			<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Kalendarz</h1>
			<div className="flex flex-row flex-wrap gap-x-10 gap-y-8 justify-center">
				{[...Array(12)].map((n, m) => {
					const monthLen = getDaysInMonth(new Date(year, m, 1));
					const firstDayOfMonth = getISODay(startOfMonth(new Date(year, m, 1))) - 1;

					return (
						<div className="flex flex-col items-center gap-y-4">
							<h1 className={`text-2xl ${poppingsFont500.className}`}>{monthsNames[m]}</h1>

							<div key={m} className="grid grid-cols-7 gap-2.5">
								{[...Array(firstDayOfMonth)].map((n, d) => {
									return <div className={`w-7 h-7`}></div>;
								})}
								{[...Array(monthLen)].map((n, d) => {
									const filteredDay: DayDataTypeWithEvents = days.filter((day) => day.day == d + 1 && day.month == m)[0];
									const day = getISODay(new Date(year, m, d + 1));

									return (
										<button
											className={`w-7 h-7 rounded-lg ${day == 6 || day == 7 ? "bg-MainDarkGray/30" : ""} ${
												filteredDay?.freeDay ? "bg-MainGreen/70" : "bg-LightGray/60"
											}`}
										>
											{d + 1}
										</button>
									);
								})}

								{[...Array(42 - firstDayOfMonth - monthLen)].map((n, d) => {
									return <div className={`w-7 h-7`}></div>;
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
