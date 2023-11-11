"use client";

import { useRouter } from "next/navigation";
import { getYear, startOfToday } from "date-fns";
import { getSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import CreateEventForm from "./createEventForm";
import FreeDaysCalendar from "./freeDaysCalendar";
import EventTile from "./eventTile";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function Page() {
	const [events, setEvents] = useState<EventDataTypeWithAuthor[]>([]);
	const [eventsCount, setEventsCount] = useState<number>(1);
	const [tags, setTags] = useState<EventTagDataType[]>([]);

	const [yearsCount, setYearsCount] = useState<number>(2);

	const today = startOfToday();
	const year = getYear(today);
	const router = useRouter();

	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			if (session) {
				if (session.user.role.manageCalendar) {
					fetchEvents();
					fetchTags();
				} else router.push("/dashboard");
			} else router.push("/");
		}
		initFunction();
	}, []);

	async function fetchTags() {
		const returnedTags = await (await fetch(`/api/dashboard/calendar/tags`)).json();
		setTags(returnedTags);
	}

	async function fetchEvents() {
		const returnedEvents = await (await fetch(`/api/dashboard/calendar/events?count=${eventsCount * 8}`)).json();
		setEvents(returnedEvents);
		setEventsCount((oldCount) => oldCount + 1);
	}

	async function refetchEvents() {
		const returnedEvents = await (await fetch(`/api/dashboard/calendar/events?count=${eventsCount * 8}`)).json();
		setEvents(returnedEvents);
	}

	return (
		<div className="dashboard-page">
			<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Wydarzenia</h1>

			<CreateEventForm tags={tags} refetchEvents={() => refetchEvents()} />

			<div className="flex w-full flex-col gap-y-3 md:gap-2 lg:gap-3 xl:gap-4 4xl:gap-6">
				{events.map((eventData: EventDataTypeWithAuthor, i) => (
					<EventTile eventData={eventData} refetchEvents={refetchEvents} key={eventData.id} tags={tags} />
				))}
				<button
					onClick={() => refetchEvents()}
					className={`text-center h-fit w-full border-2 text-xl hover:bg-LightGray/20 transition-all duration-300 p-4 px-8 rounded-2xl ${
						poppingsFont700.className
					} ${(eventsCount - 1) * 8 < events.length ? "hidden" : ""}`}
				>
					Załaduj więcej
				</button>
			</div>

			<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Dni wolne</h1>
			{[...Array(yearsCount)].map((n, yearCount) => (
				<FreeDaysCalendar year={year + yearCount} key={year + yearCount} />
			))}

			<button
				onClick={() => setYearsCount((old) => old + 1)}
				className={`text-MainDarkGray bg-white border-MainDarkGray border-2 text-xs xs:text-sm md:text-base xl:text-lg px-8 py-1.5 2xl:text-lg 3xl:text-xl 3xl:py-2 3xl:px-12 rounded-3xl hover:bg-MainDarkGray hover:text-white transition-all duration-200 ease-out ${poppingsFont700.className}`}
			>
				Załaduj więcej
			</button>
		</div>
	);
}
