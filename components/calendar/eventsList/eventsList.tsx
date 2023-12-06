import { faClock as faClockFull, faEllipsis, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDate, getMonth, startOfToday } from "date-fns";
import { getYear } from "date-fns/fp";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import EventComponent from "../../eventsSlider/eventComponent";
import { motion } from "framer-motion";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

const poppingsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});

export default function EventsList(props: { searchTagId: string | null }) {
	const [events, setEvents] = useState<EventDataTypeWithPost[]>([]);
	const [eventsCount, setEventsCount] = useState<number>(1);
	const [fetched, setFetched] = useState<boolean>(false);
	const [dates, setDates] = useState<string[]>([]);

	const [tags, setTags] = useState<EventTagDataType[]>([]);
	const [selectedTags, setSelectedTags] = useState<boolean[]>([]);
	const [search, setSearch] = useState<string>("");
	const [past, setPast] = useState<boolean>(false);

	useEffect(() => {
		fetchTags();
		fetchEvents();
	}, []);
	useEffect(() => {
		fetchEvents();
	}, [eventsCount]);
	useEffect(() => {
		searchEvents();
	}, [selectedTags, past]);

	useEffect(() => {
		let tag = tags.find((tag) => tag.id == props.searchTagId);
		if (tag) {
			const index = tags.indexOf(tag);
			let tempSelection: boolean[] = [];
			tempSelection[index] = true;
			setSelectedTags(tempSelection);
		}
	}, [props.searchTagId, tags]);

	const day = getDate(startOfToday());
	const month = getMonth(startOfToday());
	const year = getYear(startOfToday());

	async function fetchEvents() {
		const data = new FormData();
		data.set("day", day.toString());
		data.set("year", year.toString());
		data.set("month", month.toString());
		const returnedEvents: EventDataTypeWithPost[] = await (
			await fetch(`/api/calendar/events/?count=${eventsCount * 30}`, {
				method: "POST",
				body: data,
			})
		).json();

		let dates = [];

		for (const eventData of returnedEvents) {
			dates.push(eventData.date.slice(3, 10));
		}

		setEvents(returnedEvents);
		setDates(Array.from(new Set(dates)));
		setFetched(true);
	}

	async function searchEvents() {
		let request = "";

		request += "&past=" + past;
		if (search != "") request += "&search=" + search;

		let i = 0;
		for (const bool of selectedTags) {
			if (bool) {
				request += "&tag=" + tags[i].id;
			}
			i++;
		}

		const returnedEvents: EventDataTypeWithPost[] = await (await fetch(`/api/calendar/events/search/?count=${eventsCount * 30}${request}`)).json();

		let dates = [];

		for (const eventData of returnedEvents) {
			dates.push(eventData.date.slice(3, 10));
		}

		setEvents(returnedEvents);
		setDates(Array.from(new Set(dates)));
		setFetched(true);
	}

	async function fetchTags() {
		const returnedTags: EventTagDataType[] = await (await fetch(`/api/calendar/tags`)).json();
		setTags(returnedTags);
	}

	const monthsNames = ["Styczeń", "Luty", "Marzec", "Kwiecieć", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

	if (fetched) {
		return (
			<div className="flex flex-col w-full md:w-4/5 lg:w-3/5 mx-auto gap-y-12">
				<div className="flex flex-col gap-y-3 md:-mx-8 lg:-mx-20">
					<div className="flex items-center gap-3 border-2 hover:bg-LightGray/20 bg-LightGray/5 transition-all duration-300 py-1 md:py-2 md:px-3 px-2 lg:py-3 lg:px-4 3xl:px-6 xl:py-4 sm:gap-2 md:gap-3 rounded-2xl">
						<FontAwesomeIcon onClick={() => searchEvents()} icon={faSearch} className={`h-5 lg:h-6 3xl:h-7 cursor-pointer`} />
						<input
							type="text"
							onBlur={() => searchEvents()}
							value={search}
							placeholder="Wyszukaj wydarzeń..."
							onChange={(e) => setSearch(e.target.value)}
							className={`outline-none w-full bg-transparent text-sm xs:text-base md:text-lg xl:text-xl 2xl:text-2xl ${poppingsFont500.className}`}
						/>
						<motion.div
							onClick={() => setPast((old) => !old)}
							className={`flex text-2xs lg:text-xs items-center justify-center cursor-pointer transition-all p-2.5 -m-1 rounded-full ${
								past ? "bg-MainColor/60 hover:bg-MainColor/90 text-white" : "bg-LightGray hover:bg-MainDarkGray/60 hover:text-white"
							} ${poppingsFont500.className}`}
						>
							<FontAwesomeIcon icon={past ? faClockFull : faClock} className={`h-4 2xl:h-6 whitespace-nowrap`} />
							<motion.p
								className=""
								transition={{
									type: "spring",
									stiffness: 260,
									damping: 20,
								}}
								animate={{
									width: past ? "auto" : 0,
									opacity: past ? 1 : 0,
									marginLeft: past ? "0.5rem" : 0,
								}}
							>
								Przeszłe
							</motion.p>
						</motion.div>
					</div>

					<div className="flex items-center gap-x-2 sm:gap-x-3 hide-scrollbar overflow-x-auto w-full">
						{tags.map((tag, i) => (
							<button
								key={tag.id}
								onClick={() =>
									setSelectedTags((old) => {
										let newList = [...old];
										newList[i] = !old[i];
										return newList;
									})
								}
								className={`flex h-fit rounded-3xl py-1 gap-x-2 px-2 sm:px-3 items-center transition-color duration-300`}
								style={{ backgroundColor: selectedTags[i] ? tag.color : "#efefef" }}
							>
								<div
									className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-color duration-300`}
									style={{ backgroundColor: selectedTags[i] ? "white" : tag.color }}
								/>
								<p
									className={`text-xs whitespace-nowrap sm:text-sm md:text-base transition-color duration-300 ${poppingsFont500.className} ${
										selectedTags[i] ? "text-white" : "text-MainDarkGray"
									}`}
								>
									{tag.name}
								</p>
							</button>
						))}
					</div>
				</div>

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
									onClick={() => setEventsCount((oldCount) => oldCount + 1)}
									className={`
									${events.length < eventsCount * 30 ? "hidden" : ""}
									 flex rounded-3xl items-center border-[1px] border-SecondColor border-dotted p-3.5 lg:p-7 gap-x-5`}
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
			<div className="flex flex-col w-full md:w-4/5 lg:w-3/5 mx-auto gap-y-3">
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
