"use client";
import { format, getDaysInMonth, getISODay, startOfMonth } from "date-fns";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { useState } from "react";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});
const poppingsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});
const plusJakartaSans800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});
export default function NewAnnouncementForm(props: { toggle: Function }) {
	const [newContent, setNewContent] = useState("");
	const [selectedDays, setSelectedDays] = useState<string[]>([]);
	const today = new Date();
	const d = today.getDate();
	const m = today.getMonth();
	const y = today.getFullYear();
	const monthsNames = ["Styczeń", "Luty", "Marzec", "Kwiecieć", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

	async function addAnnouncement() {
		const data = new FormData();
		data.set("content", newContent);

		for (const date of selectedDays) {
			data.append("dates[]", date);
		}

		const res = await fetch("/api/dashboard/announcements/ ", {
			method: "POST",
			body: data,
		});

		if (!res.ok) throw new Error(await res.text());

		props.toggle();
	}

	return (
		<>
			<div className="fixed z-40 max-w-screen-xs sm:max-w-screen-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:max-w-screen-md lg:max-w-screen-xl flex flex-col items-center text-left border-2 bg-LightGray py-4 md:py-5 md:px-7 px-4 lg:py-7 lg:px-7 3xl:px-10 xl:py-8 gap-y-1.5 sm:gap-2 md:gap-3 rounded-2xl">
				<h1 className={`w-full sm:text-xl md:text-2xl ${poppingsFont700.className}`}>Dodaj nowy komunikat</h1>
				<textarea
					onChange={(e) => setNewContent(e.target.value)}
					value={newContent}
					id="content"
					className="rounded-lg outline-none bg-white p-2 w-full text-2xs sm:text-xs md:text-sm h-20 sm:h-40 md:h-52 lg:h-60"
					placeholder="Podaj treść komunikatu"
				/>

				<div id="newAnnouncementCalendar" className="flex flex-row flex-wrap gap-x-10 gap-y-8 justify-center">
					{[...Array(4)].map((_, i) => {
						const monthLen = getDaysInMonth(today);
						const firstDayOfMonth = getISODay(startOfMonth(new Date(y, m + i, 1))) - 1;

						return (
							<div className="flex flex-col items-center gap-y-4" key={i}>
								<h1 className={`sm:text-lg md:text-xl lg:text-2xl ${poppingsFont500.className}`}>{monthsNames[(m + i) % 12]}</h1>

								<div key={m} className="grid grid-cols-7 gap-1.5 sm:gap-2 text-sm md:text-sm lg:text-base 2xl:text-lg">
									{[...Array(firstDayOfMonth)].map((_, j) => {
										return <div className={`w-6 h-6 md:w-7 md:h-7`} key={j}></div>;
									})}
									{[...Array(monthLen)].map((_, j) => {
										const day = j + 1;
										const month = (m + i) % 12;
										const year = y + Math.floor((m + i) / 12);
										const date = format(new Date(year, month, day), "dd-MM-yyyy");
										const isSelected = selectedDays.indexOf(date) != -1;
										return (
											<button
												disabled={m >= month && d > day}
												onClick={() => {
													let newList = [...selectedDays];
													const index = selectedDays.indexOf(date);

													if (isSelected) newList.splice(index);
													else newList.push(date);

													setSelectedDays(newList);
												}}
												key={j}
												className={`w-6 h-6 md:w-7 md:h-7 rounded-lg ${isSelected ? "bg-MainColor/70" : "bg-MainDarkGray/10"} ${
													((firstDayOfMonth + j) % 7 == 6 || (firstDayOfMonth + j) % 7 == 5) && "!bg-MainDarkGray/30"
												} ${day == d && month == m && year == y ? "scale-110 border-MainColor border-2" : ""} ${
													m >= month && d > day && "opacity-60"
												}`}
											>
												{day}
											</button>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>

				<button
					onClick={() => addAnnouncement()}
					className={`w-fit bg-MainColor hover:bg-MainDarkGray transition-all duration-300 ease-out text-xs sm:text-sm md:text-base lg:text-lg px-20 my-5 py-3 text-white rounded-3xl ${plusJakartaSans800.className}`}
				>
					Dodaj komunikat
				</button>
			</div>
			<div className="fixed z-20 cursor-pointer top-0 backdrop-blur-sm left-0 w-screen h-screen" onClick={() => props.toggle()}></div>
		</>
	);
}
