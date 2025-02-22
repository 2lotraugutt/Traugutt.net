"use client";

import { parse } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function StageSix(props: { down: Function; up: Function; setEvent: Function; initEventId: string | null }) {
	const [eventId, setEventId] = useState(props.initEventId);
	const [events, setEvents] = useState<EventDataType[]>([]);
	const [search, setSearch] = useState("");

	function nextStage() {
		props.setEvent(eventId);
		props.up();
	}

	useEffect(() => {
		async function fetchEvents() {
			const returnedEvents = await (await fetch(`/api/dashboard/calendar/events`)).json();
			setEvents(returnedEvents);
		}

		fetchEvents();
	}, []);

	function returnDate(date: string) {
		const months = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];

		let newDate = parse(date, "dd-MM-yyyy", new Date());
		if (isNaN(newDate.getTime())) newDate = new Date(date);

		return newDate.getDate() + " " + months[newDate.getMonth()] + " " + newDate.getFullYear();
	}

	return (
		<div className="dashboard-post-page">
			<Image src="/newPost/Wave-1.svg" width="1920" height="1080" className="absolute top-0 right-0 w-full h-full object-center object-cover" alt="" />
			<div className="flex flex-col items-center gap-y-10 absolute top-1/2 -translate-y-1/2">
				<div className="flex flex-col max-w-xl gap-y-3">
					<h1 className={`text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-center poppinsFont700`}>Połącz z wydarzeniem</h1>
					<p className={`text-center px-5 ext-xs xs:text-sm lg:text-base xl:text-xl 2xl:text-2xl poppinsFont400`}>
						W tym momencie możesz połączyć ten post z istniejącym wydarzeniem
					</p>
				</div>

				<div className="w-full h-96 flex flex-col gap-y-1">
					{eventId && events.length != 0 && (
						<div
							className={`bg-white mb-4 justify-between border-2 transition-all border-MainDarkGray duration-300 py-1 md:py-2 xl:py-3 lg:py-1.5 px-1 md:px-3 lg:px-4 3xl:px-5 flex rounded-xl`}
						>
							<p className={"poppinsFont600"}>{events.find((event) => event.id == eventId)!.name}</p>
							<p className={"poppinsFont400"}>{returnDate(events.find((event) => event.id == eventId)!.date)}</p>
						</div>
					)}

					<input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="bg-white border-2 rounded-lg px-3 py-1 outline-none"
						placeholder="Wyszukaj wydarzenie"
					/>

					<div className="overflow-y-auto flex flex-col gap-y-1">
						{events
							.filter((event) => event.name.toLowerCase().includes(search.toLowerCase()))
							.map((event, i) => (
								<div
									key={i}
									onClick={() => setEventId(event.id)}
									className={`bg-white cursor-pointer border-dashed hover:bg-LightGray justify-between border-2 hover:bg-LightGray/40 transition-all duration-300 py-1 md:py-2 xl:py-3 lg:py-1.5 px-1 md:px-3 lg:px-4 3xl:px-5 flex rounded-xl`}
								>
									<p className={"poppinsFont600"}>{event.name}</p>
									<p className={"poppinsFont400"}>{returnDate(event.date)}</p>
								</div>
							))}
					</div>
				</div>

				<div className="flex justify-between w-full">
					<button onClick={() => props.down()} className={`bg-MainDarkGray px-8 py-3 text-white rounded-3xl plusJakartaSans600`}>
						Powrót
					</button>
					<button onClick={() => nextStage()} className={`bg-MainColor px-8 py-3 text-white rounded-3xl plusJakartaSans600`}>
						Kontynuuj
					</button>
				</div>
			</div>
		</div>
	);
}
