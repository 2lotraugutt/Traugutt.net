"use client";

import FreeDaysCalendar from "@/components/dashboard/freeDaysCalendar";
// import LoadingLayout from "@/components/dashboard/loadingLayout";
import { useRouter } from "next/navigation";
import { getYear, startOfToday } from "date-fns";
import { getSession } from "next-auth/react";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import { useEffect, useState } from "react";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

const plusJakartaSans800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

export default function Page() {
	const [newTitle, setNewTitle] = useState("");
	const [newContent, setNewContent] = useState("");
	const [newDate, setNewDate] = useState("");
	const [notifications, setNotifications] = useState<NotificationWithAutorDataType[]>([]);
	const [notificationsCount, setNotificationsCount] = useState<number>(1);

	const [yearsCount, setYearsCount] = useState<number>(2);

	const today = startOfToday();
	const year = getYear(today);
	const router = useRouter();

	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			if (session) {
				if (!session.user.role.manageCalendar) router.push("/dashboard");
			} else router.push("/");
		}
		initFunction();
	}, []);

	async function upload() {
		// try {
		// 	const data = new FormData();
		// 	data.set("title", newTitle);
		// 	data.set("content", newContent);
		// 	const res = await fetch("/api/dashboard/notifications/", {
		// 		method: "POST",
		// 		body: data,
		// 	});
		// 	if (!res.ok) throw new Error(await res.text());
		// 	if (res.ok) {
		// 		setNewTitle("");
		// 		setNewContent("");
		// 		refetchNotifications();
		// 	}
		// } catch (e: any) {
		// 	// Handle errors here
		// 	console.error(e);
		// }
	}

	return (
		<div className="dashboard-page">
			<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Wydarzenia</h1>
			<div className="flex flex-col items-center h-fit w-full text-left border-2 hover:bg-LightGray/40 bg-LightGray/20 transition-all duration-300 py-4 md:py-5 md:px-7 px-4 lg:py-7 lg:px-7 3xl:px-10 xl:py-8 gap-y-1.5 sm:gap-2 md:gap-3 rounded-2xl">
				<h1 className={`w-full sm:text-xl md:text-2xl ${poppingsFont700.className}`}>Dodaj nowe wydarzenie</h1>

				<div className="flex gap-1.5 sm:gap-2 md:gap-3 w-full">
					<input
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
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

				<textarea
					onChange={(e) => setNewContent(e.target.value)}
					value={newContent}
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
