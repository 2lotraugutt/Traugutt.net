"use client";

import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { format, isMatch } from "date-fns";
import AnnouncementTile from "@/app/radio/announcementTile";
import AnnouncementsSkeleton from "@/app/radio/announcementsSkeleton";
import Link from "next/link";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function Page({ params }: { params: { date: string } }) {
	const [announcements, setAnnouncements] = useState<AnnouncementWithAutorDataType[]>();
	const [announcementsCount, setAnnouncementsCount] = useState<number>(1);

	useEffect(() => {
		fetchAnnouncements();
		console.log(params.date);
	}, []);

	async function fetchAnnouncements() {
		const dateToFetch = params.date == "today" ? format(new Date(), "dd-MM-yyyy") : params.date;

		const returnedAnnouncements: AnnouncementWithAutorDataType[] = await (await fetch(`/api/announcements/${dateToFetch}/?count=${announcementsCount * 10}`)).json();

		setAnnouncements(returnedAnnouncements);

		setAnnouncementsCount((oldCount) => oldCount + 1);
	}

	function formatDate(dateToFormat: string) {
		if (isMatch(dateToFormat, "dd-MM-yyyy")) {
			const monthsNames = ["Styczeń", "Luty", "Marzec", "Kwiecieć", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

			const day = dateToFormat.slice(0, 2);
			const month = monthsNames[parseInt(dateToFormat.slice(3, 5)) - 1];
			const year = dateToFormat.slice(6, 10);

			return `${day} ${month} ${year}`;
		} else {
			return "Wprowadzono błędne dane!";
		}
	}

	if (announcements)
		return (
			<div className="flex w-full flex-col overflow-hidden lg:px-12 px-2 md:px-5 4xl:px-0 gap-y-3 sm:gap-y-5 xl:gap-y-7 3xl:gap-y-9 items-center">
				<div className="w-full">
					<h1
						className={`w-fit mx-auto text-2xl xs:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl xl:mt-9 mb-6 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20 ${poppingsFont700.className}`}
					>
						{params.date == "today" ? "Dzisiejsze komunikaty" : formatDate(params.date)}
					</h1>
					<Link href="/radio" className={`hover:text-MainColor w-fit text-xl xs:text-sm lg:text-lg xl:text-xl 2xl:text-2xl ${poppingsFont700.className}`}>
						Zobacz wszystkie komunikaty
					</Link>
				</div>

				{announcements.length != 0 && (
					<div className="flex w-full flex-col gap-y-4 md:gap-2 lg:gap-4 xl:gap-5 4xl:gap-7">
						<div className="flex flex-col gap-y-4 md:gap-2 lg:gap-4 xl:gap-5 4xl:gap-7">
							{announcements.map((announcementData, j) => (
								<AnnouncementTile announcementData={announcementData} key={j} />
							))}
						</div>

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
