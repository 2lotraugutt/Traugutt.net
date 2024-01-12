import { getDaysInMonth, getISODay, startOfMonth } from "date-fns";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";

const poppingsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});

export default function FreeDaysCalendar(props: { year: number }) {
	const [days, setDays] = useState<DayDataType[]>([]);

	useEffect(() => {
		fetchPost();
	}, [props.year]);

	async function fetchPost() {
		const days = await (await fetch(`/api/calendar/days?year=${props.year}`)).json();
		setDays(days);
	}

	async function toggleDay(year: number, day: number, month: number, state: boolean) {
		const data = new FormData();
		data.set("day", day.toString());
		data.set("month", month.toString());
		data.set("year", year.toString());
		data.set("state", state.toString());

		await (await fetch(`/api/dashboard/calendar/setFreeDay`, { method: "PUT", body: data })).json();

		fetchPost();
	}

	const monthsNames = ["Styczeń", "Luty", "Marzec", "Kwiecieć", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

	return (
		<div className="relative">
			<h1 className={`sticky lg:text-lg xl:text-xl bg-white rounded-lg py-1 px-3 w-fit flex items-center top-40 ${poppingsFont500.className}`}>{props.year}</h1>
			<div className="flex flex-row flex-wrap gap-x-10 gap-y-8 justify-center">
				{[...Array(12)].map((n, m) => {
					const monthLen = getDaysInMonth(new Date(props.year, m, 1));
					const firstDayOfMonth = getISODay(startOfMonth(new Date(props.year, m, 1))) - 1;

					return (
						<div className="flex flex-col items-center gap-y-4" key={m}>
							<h1 className={`text-2xl ${poppingsFont500.className}`}>{monthsNames[m]}</h1>

							<div key={m} className="grid grid-cols-7 gap-2.5">
								{[...Array(firstDayOfMonth)].map((n, d) => {
									return <div className={`w-7 h-7`} key={d}></div>;
								})}
								{[...Array(monthLen)].map((n, d) => {
									const filteredDay: DayDataType = days.filter((day) => day.day == d + 1 && day.month == m && day.year == props.year)[0];
									const day = getISODay(new Date(props.year, m, d + 1));

									return (
										<button
											onClick={() => toggleDay(props.year, d + 1, m, filteredDay ? !filteredDay.freeDay : true)}
											key={firstDayOfMonth + d}
											className={`w-7 h-7 rounded-lg ${filteredDay?.freeDay ? "bg-MainColor/70" : "bg-LightGray/60"} ${
												day == 6 || day == 7 ? "bg-MainDarkGray/30" : ""
											}`}
										>
											{d + 1}
										</button>
									);
								})}

								{[...Array(42 - firstDayOfMonth - monthLen)].map((n, d) => {
									return <div className={`w-7 h-7`} key={firstDayOfMonth + monthLen + d}></div>;
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
