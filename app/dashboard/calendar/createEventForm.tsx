"use client";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";

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

export default function CreateEventForm(props: { refetchEvents: Function }) {
	const [newName, setNewName] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const [newDate, setNewDate] = useState("");
	const [tags, setTags] = useState<EventTagDataType[]>([]);
	const [selectedTags, setSelectedTags] = useState<boolean[]>([]);
	const [buttonText, setButtonText] = useState("Dodaj wydarzenie");

	const router = useRouter();

	async function fetchTags() {
		const returnedTags = (await (await fetch(`/api/dashboard/calendar/tags`)).json()) as EventTagDataType[];
		setTags(returnedTags);
		setSelectedTags(new Array(returnedTags.length).fill(false));
	}

	async function upload() {
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

		setButtonText("Dodawanie wydarzenia...");
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
			setButtonText("Dodaj wydarzenia");
			props.refetchEvents();
		}
	}

	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			if (session) {
				if (session.user.role.manageCalendar) {
					fetchTags();
				} else router.push("/dashboard");
			} else router.push("/");
		}
		initFunction();
	}, []);

	return (
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
				<input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="rounded-lg p-2 w-fit text-center text-xs sm:text-sm md:text-base" />
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
				className={`w-fit bg-MainColor hover:bg-MainDarkGray transition-all duration-300 ease-out text-xs sm:text-sm md:text-base lg:text-lg px-20 my-5 py-3 text-white rounded-3xl ${plusJakartaSans800.className}`}
			>
				{buttonText}
			</button>
		</div>
	);
}
