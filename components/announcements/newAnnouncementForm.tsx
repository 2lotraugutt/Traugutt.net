"use client";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMonth, getYear, startOfToday } from "date-fns";
import { useState } from "react";
import AnnouncementsCalendar from "./announcementsCalendar";

export default function NewAnnouncementForm(props: { toggle: Function }) {
	const [newContent, setNewContent] = useState("");
	const [selectedDays, setSelectedDays] = useState<string[]>([]);
	const [month, setMonth] = useState<number>(getMonth(startOfToday()));
	const [year, setYear] = useState<number>(getYear(startOfToday()));

	const monthsNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

	async function addAnnouncement() {
		const data = new FormData();
		data.set("content", newContent);

		for (const date of selectedDays) {
			data.append("dates[]", date);
		}

		const res = await fetch("/api/dashboard/announcement/ ", {
			method: "POST",
			body: data,
		});

		if (!res.ok) throw new Error(await res.text());

		props.toggle();
	}

	function changeMonth(up: boolean) {
		if (up) {
			if (month == 11) {
				setMonth(0);
				setYear((old) => old + 1);
			} else setMonth((old) => old + 1);
		} else {
			if (month == 0) {
				setMonth(11);
				setYear((old) => old - 1);
			} else setMonth((old) => old - 1);
		}
	}

	return (
		<>
			<div className="fixed z-40 max-w-screen-xs sm:max-w-screen-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:max-w-screen-md lg:max-w-screen-xl flex flex-col items-center text-left border-2 bg-LightGray py-4 md:py-5 md:px-7 px-4 lg:py-7 lg:px-7 3xl:px-10 xl:py-8 gap-y-1.5 sm:gap-2 md:gap-3 rounded-2xl">
				<h1 className={`w-full sm:text-xl md:text-2xl poppinsFont700`}>Dodaj nowy komunikat</h1>

				<div className="flex gap-10 w-full items-center flex-col lg:flex-row">
					<textarea
						onChange={(e) => setNewContent(e.target.value)}
						value={newContent}
						id="content"
						className="rounded-lg outline-none bg-white p-2 w-full lg:w-fit lg:grow text-2xs sm:text-xs md:text-sm h-20 sm:h-40 md:h-52 lg:h-60"
						placeholder="Podaj treść komunikatu"
					/>

					<div className="flex flex-col items-center gap-y-4">
						<div className="flex items-center justify-between w-full">
							<FontAwesomeIcon icon={faBackward} className="text-MainDarkGray/80 hover:text-MainColor transition-all" onClick={() => changeMonth(false)} />
							<h1 className={`sm:text-lg md:text-xl text-center lg:text-2xl poppinsFont500`}>{monthsNames[month]}</h1>
							<FontAwesomeIcon icon={faForward} className="text-MainDarkGray/80 hover:text-MainColor transition-all" onClick={() => changeMonth(true)} />
						</div>
						<AnnouncementsCalendar month={month} year={year} setSelectedDays={(e: string[]) => setSelectedDays(e)} selectedDays={selectedDays} />
					</div>
				</div>

				<div className="flex flex-col-reverse items-center md:flex-row justify-center my-5 gap-3">
					<button
						onClick={() => props.toggle()}
						className={`w-full md:w-fit bg-MainDarkGray/60 hover:bg-MainDarkGray transition-all duration-300 ease-out text-xs sm:text-sm md:text-base lg:text-lg px-20 py-3 text-white rounded-3xl plusJakartaSans800`}
					>
						Anuluj
					</button>
					<button
						onClick={() => addAnnouncement()}
						className={`w-full md:w-fit bg-MainColor hover:bg-MainDarkGray transition-all duration-300 ease-out text-xs sm:text-sm md:text-base lg:text-lg px-20 py-3 text-white rounded-3xl plusJakartaSans800`}
					>
						Dodaj komunikat
					</button>
				</div>
			</div>
			<div className="fixed z-20 cursor-pointer top-0 backdrop-blur-sm left-0 w-screen h-screen" onClick={() => props.toggle()}></div>
		</>
	);
}
