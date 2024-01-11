"use client";

import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import LoadingLayout from "@/app/dashboard/loadingLayout";
import { compareAsc, parse } from "date-fns";
import AnnouncementTile from "./AnnouncementTile";
import AnnouncementsSkeleton from "./announcementsSkeleton";

type FormattedAnnouncements = { date: string; announcements: AnnouncementWithAutorDataType[] }[];

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function Page() {
	const [announcements, setAnnouncements] = useState<FormattedAnnouncements>();
	const [announcementsCount, setAnnouncementsCount] = useState<number>(1);

	useEffect(() => {
		fetchAnnouncements();
	}, []);

	async function fetchAnnouncements() {
		const returnedAnnouncements: AnnouncementWithAutorDataType[] = await (await fetch(`/api/announcements?count=${announcementsCount * 10}`)).json();

		const formattedAnnouncements = formatAnnouncements(returnedAnnouncements);
		setAnnouncements(formattedAnnouncements);

		setAnnouncementsCount((oldCount) => oldCount + 1);
	}

	function formatAnnouncements(announcementsToFormat: AnnouncementWithAutorDataType[]): FormattedAnnouncements {
		var newAnnouncements: { [date: string]: AnnouncementWithAutorDataType[] } = {};
		const timeStampNow = new Date();

		for (var announcement of announcementsToFormat) {
			announcement.days.forEach((day) => {
				if (new Date(day.timeStamp) > timeStampNow) {
					const dateKey = day.date;

					if (!newAnnouncements[dateKey]) {
						newAnnouncements[dateKey] = [];
					}

					newAnnouncements[dateKey].push(announcement);
				}
			});
		}

		var toReturn = Object.entries(newAnnouncements).map(([date, announcements]) => ({
			date,
			announcements,
		}));

		toReturn = toReturn.sort((a, b) => compareAsc(parse(a.date, "dd-MM-yyyy", new Date()), parse(b.date, "dd-MM-yyyy", new Date())));

		return toReturn;
	}

	if (announcements)
		return (
			<div className="flex w-full flex-col overflow-hidden lg:px-12 px-2 md:px-5 4xl:px-0 gap-y-3 sm:gap-y-5 xl:gap-y-7 3xl:gap-y-9 items-center">
				<h1
					className={`w-fit text-2xl xs:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl xl:mt-9 mb-6 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20 ${poppingsFont700.className}`}
				>
					Wszystkie komunikaty
				</h1>

				{announcements.length != 0 && (
					<div className="flex w-full flex-col gap-y-4 md:gap-2 lg:gap-4 xl:gap-5 4xl:gap-7">
						{announcements.map((date, i) => (
							<div key={date.date}>
								<h2
									className={`w-fit text-md md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl xl:mb-3 mb-2 sm:mt-3 md:mt-4 lg:mt-5 xl:mt-6 ${poppingsFont700.className}`}
								>
									{date.date}
								</h2>
								<div className="flex flex-col gap-y-4 md:gap-2 lg:gap-4 xl:gap-5 4xl:gap-7">
									{date.announcements.map((announcementData, j) => (
										<AnnouncementTile announcementData={announcementData} key={date.date + j} />
									))}
								</div>
							</div>
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
	else return <AnnouncementsSkeleton />;
}
