"use client";

import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import DashboardPostTile from "@/app/dashboard/post/postTile";
import LoadingLayout from "@/app/dashboard/loadingLayout";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function Page() {
	const [announcements, setAnnouncements] = useState<AnnouncementWithAutorDataType[]>();
	const [announcementsCount, setAnnouncementsCount] = useState<number>(1);

	useEffect(() => {
		fetchAnnouncements();
	}, []);

	async function fetchAnnouncements() {
		const returnedAnnouncements = await (await fetch(`/api/announcements?count=${announcementsCount * 10}`)).json();
		setAnnouncements(returnedAnnouncements);

		setAnnouncementsCount((oldCount) => oldCount + 1);
	}

	if (announcements)
		return (
			<div className="flex w-full flex-col overflow-hidden lg:px-12 px-2 md:px-5 4xl:px-0 gap-y-3 sm:gap-y-5 xl:gap-y-7 3xl:gap-y-9 items-center">
				<h1
					className={`w-fit text-2xl xs:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl xl:mt-9 mb-6 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20 ${poppingsFont700.className}`}
				>
					Wszystkie ogłoszenia
				</h1>

				{announcements.length != 0 && (
					<div className="flex w-full flex-col gap-y-3 md:gap-2 lg:gap-3 xl:gap-4 4xl:gap-6">
						{announcements.map((announcementData: AnnouncementWithAutorDataType) => (
							<div>{announcementData.content}</div>
						))}

						<button
							onClick={() => fetchAnnouncements()}
							className={`text-center h-fit w-full border-2 text-xl hover:bg-LightGray/20 transition-all duration-300 p-4 px-8 rounded-2xl ${
								poppingsFont700.className
							} ${(announcementsCount - 1) * 10 > announcements.length ? "hidden" : ""}`}
						>
							Załaduj więcej
						</button>
					</div>
				)}
			</div>
		);
	else return <LoadingLayout />;
}
