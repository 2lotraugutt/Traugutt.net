"use client";
import { getSession } from "next-auth/react";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NotificationTile from "@/app/dashboard/notifications/notificationTile";
import AnnouncementTile from "./announcementTile";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});
const plusJakartaSans800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

export default function Page() {
	const [announcements, setAnnouncements] = useState<AnnouncementDataType[]>([]);
	const [announcementsCount, setAnnouncementsCount] = useState<number>(1);

	const router = useRouter();
	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			if (session) {
				if (session.user.role.manageAnnouncements) {
					fetchAnnouncements();
				} else router.push("/dashboard");
			} else router.push("/");
		}
		initFunction();
	}, [router]);

	async function fetchAnnouncements() {
		const returnedAnnouncements = await (await fetch(`/api/announcements?count=${announcementsCount * 30}`)).json();
		setAnnouncements(returnedAnnouncements);

		setAnnouncementsCount((oldCount) => oldCount + 1);
	}

	async function refetchAnnouncements() {
		const returnedAnnouncements = await (await fetch(`/api/announcements?count=${announcementsCount * 30}`)).json();
		setAnnouncements(returnedAnnouncements);
	}

	return (
		<div className="dashboard-page">
			<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Komunikaty</h1>

			<div className="flex w-full flex-col gap-y-3 md:gap-2 lg:gap-3 xl:gap-4 4xl:gap-6">
				{announcements.map((announcementData: AnnouncementDataType, i) => (
					<AnnouncementTile announcementData={announcementData} refetchAnnouncements={refetchAnnouncements} key={i} />
				))}

				<button
					onClick={() => fetchAnnouncements()}
					className={`text-center h-fit w-full border-2 text-xl hover:bg-LightGray/20 transition-all duration-300 p-4 px-8 rounded-2xl ${
						poppingsFont700.className
					} ${(announcementsCount - 1) * 30 > announcements.length ? "hidden" : ""}`}
				>
					Załaduj więcej
				</button>
			</div>
		</div>
	);
}
