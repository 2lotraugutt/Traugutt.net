"use client";

import FreeDaysCalendar from "@/components/dashboard/freeDaysCalendar";
// import LoadingLayout from "@/components/dashboard/loadingLayout";
import { useRouter } from "next/navigation";
import { getYear, startOfToday } from "date-fns";
import { getSession } from "next-auth/react";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import EventTile from "@/components/dashboard/eventTile";

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

export default function Page() {
	const [newName, setNewName] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const [newDate, setNewDate] = useState("");
	const [tags, setTags] = useState<EventTagDataType[]>([]);
	const [selectedTags, setSelectedTags] = useState<boolean[]>([]);

	const [events, setEvents] = useState<EventDataTypeWithAuthor[]>([]);
	const [eventsCount, setEventsCount] = useState<number>(1);

	const [yearsCount, setYearsCount] = useState<number>(2);

	const today = startOfToday();
	const year = getYear(today);
	const router = useRouter();

	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			if (session) {
				if (session.user.role.manageCalendar) {
					fetchTags();
					fetchEvents();
				} else router.push("/dashboard");
			} else router.push("/");
		}
		initFunction();
	}, []);

	async function upload() {
		try {
			const data = new FormData();

			data.set("name", newName);
			data.set("description", newDescription);
			data.set("date", newDate.slice(8, 10) + "-" + newDate.slice(5, 7) + "-" + newDate.slice(0, 4));

			let i = 0;
			for (const bool of selectedTags) {
				if (bool) {
					data.append("tags[]", tags[i].id);
				}
				i++;
			}

			const res = await fetch("/api/dashboard/calendar/events/", {
				method: "POST",
				body: data,
			});

			if (!res.ok) throw new Error(await res.text());
			if (res.ok) {
				setSelectedTags(new Array(tags.length).fill(false));
				setNewName("");
				setNewDescription("");
				setNewDate("");
				refetchEvents();
			}
		} catch (e: any) {
			// Handle errors here
			console.error(e);
		}
	}

	async function fetchTags() {
		const returnedTags = (await (await fetch(`/api/dashboard/calendar/tags`)).json()) as EventTagDataType[];
		setTags(returnedTags);
		setSelectedTags(new Array(returnedTags.length).fill(false));
	}

	async function fetchEvents() {
		const returnedEvents = await (await fetch(`/api/dashboard/calendar/events?count=${eventsCount * 20}`)).json();
		setEvents(returnedEvents);
		setEventsCount((oldCount) => oldCount + 1);
	}

	async function refetchEvents() {
		const returnedEvents = await (await fetch(`/api/dashboard/calendar/events?count=${eventsCount * 20}`)).json();
		setEvents(returnedEvents);
	}

	return (
		<div className="dashboard-page">
			<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Wydarzenia</h1>
			<div className="flex flex-col items-center h-fit w-full text-left border-2 hover:bg-LightGray/40 bg-LightGray/20 transition-all duration-300 py-4 md:py-5 md:px-7 px-4 lg:py-7 lg:px-7 3xl:px-10 xl:py-8 gap-y-1.5 sm:gap-2 md:gap-3 rounded-2xl">
				<h1 className={`w-full sm:text-xl md:text-2xl ${poppingsFont700.className}`}>Dodaj nowe wydarzenie</h1>

				<div className="flex gap-1.5 sm:gap-2 md:gap-3 w-full">
					<input
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
						type="text"
						id="title"
						placeholder="Podaj nazwe"
						className="bg-white rounded-lg p-2 outline-none grow text-xs sm:text-sm md:text-base"
					/>
					<input
						type="date"
						value={newDate}
						onChange={(e) => setNewDate(e.target.value)}
						className="rounded-lg p-2 w-fit text-center text-xs sm:text-sm md:text-base"
					/>
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
							style={{ backgroundColor: selectedTags[i] ? tag.color : "white" }}
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

				<textarea
					onChange={(e) => setNewDescription(e.target.value)}
					value={newDescription}
					id="content"
					className="rounded-lg outline-none bg-white p-2 w-full text-2xs sm:text-xs h-20 sm:h-40 md:h-52 lg:h-60 md:text-sm"
					placeholder="Podaj treść wiadomości"
				/>

				<button
					onClick={() => upload()}
					className={`w-fit bg-MainGreen hover:bg-MainDarkGray transition-all duration-300 ease-out text-xs sm:text-sm md:text-base lg:text-lg px-20 my-5 py-3 text-white rounded-3xl ${plusJakartaSans800.className}`}
				>
					Dodaj wiadomość
				</button>
			</div>

			<div className="flex w-full flex-col gap-y-3 md:gap-2 lg:gap-3 xl:gap-4 4xl:gap-6">
				{events.map((eventData: EventDataTypeWithAuthor, i) => (
					<EventTile eventData={eventData} refetchEvents={refetchEvents} key={eventData.id} />
				))}

				<button
					onClick={() => refetchEvents()}
					className={`text-center h-fit w-full border-2 text-xl hover:bg-LightGray/20 transition-all duration-300 p-4 px-8 rounded-2xl ${
						poppingsFont700.className
					} ${(eventsCount - 1) * 20 > events.length ? "hidden" : ""}`}
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
	// else return <LoadingLayout />;
}
