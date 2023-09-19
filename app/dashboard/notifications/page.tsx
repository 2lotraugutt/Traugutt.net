"use client";
import { getSession } from "next-auth/react";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NotificationTile from "@/components/dashboard/notificationTile";

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
	const [notifications, setNotifications] = useState<NotificationWithAutorDataType[]>([]);
	const [notificationsCount, setNotificationsCount] = useState<number>(1);

	const router = useRouter();

	async function upload() {
		try {
			const data = new FormData();
			data.set("title", newTitle);
			data.set("content", newContent);

			const res = await fetch("/api/dashboard/notifications/", {
				method: "POST",
				body: data,
			});

			if (!res.ok) throw new Error(await res.text());

			if (res.ok) {
				setNewTitle("");
				setNewContent("");
				refetchNotifications();
			}
		} catch (e: any) {
			// Handle errors here
			console.error(e);
		}
	}

	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			if (session) {
				if (session.user.role.manageNotifications) {
					fetchNotifications();
				} else router.push("/dashboard");
			} else router.push("/");
		}
		initFunction();
	}, []);

	async function fetchNotifications() {
		const returnedNotifications = await (await fetch(`/api/dashboard/notifications?count=${notificationsCount * 30}`)).json();
		setNotifications(returnedNotifications);

		setNotificationsCount((oldCount) => oldCount + 1);
	}

	async function refetchNotifications() {
		const returnedNotifications = await (await fetch(`/api/dashboard/notifications?count=${notificationsCount * 30}`)).json();
		setNotifications(returnedNotifications);
	}

	return (
		<div className="dashboard-page">
			<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Wiadomości</h1>

			<div className="flex flex-col items-center h-fit w-full text-left border-2 hover:bg-LightGray/40 bg-LightGray/20 transition-all duration-300 py-4 md:py-5 md:px-7 px-4 lg:py-7 lg:px-7 3xl:px-10 xl:py-8 gap-y-1.5 sm:gap-2 md:gap-3 rounded-2xl">
				<h1 className={`w-full sm:text-xl md:text-2xl ${poppingsFont700.className}`}>Dodaj nową wiadomość</h1>
				<input
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)}
					type="text"
					id="title"
					placeholder="Podaj tytuł"
					className="bg-white rounded-lg p-2 outline-none w-full text-xs sm:text-sm md:text-base"
				/>
				<textarea
					onChange={(e) => setNewContent(e.target.value)}
					value={newContent}
					id="content"
					className="rounded-lg outline-none bg-white p-2 w-full text-2xs sm:text-xs md:text-sm h-20 sm:h-40 md:h-52 lg:h-60"
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
				{notifications.map((notificationData: NotificationWithAutorDataType, i) => (
					<NotificationTile notificationData={notificationData} refetchNotifications={refetchNotifications} key={i} />
				))}

				<button
					onClick={() => fetchNotifications()}
					className={`text-center h-fit w-full border-2 text-xl hover:bg-LightGray/20 transition-all duration-300 p-4 px-8 rounded-2xl ${
						poppingsFont700.className
					} ${(notificationsCount - 1) * 30 > notifications.length ? "hidden" : ""}`}
				>
					Załaduj więcej
				</button>
			</div>
		</div>
	);
}
