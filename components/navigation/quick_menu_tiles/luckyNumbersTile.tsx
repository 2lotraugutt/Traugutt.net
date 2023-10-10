"use client";

import { format, isSaturday, isSunday, startOfToday } from "date-fns";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const plusJakartaSansFont800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

const poppingsFont800 = Poppins({
	weight: "800",
	subsets: ["latin"],
});

export default function LuckyNumbersTile() {
	const [numbers, setNumbers] = useState<{ number: number; date: string }[]>([]);

	useEffect(() => {
		fetchPost();
		async function fetchPost() {
			const numbers = await (await fetch("api/calendar/getWeekNumbers")).json();

			setNumbers(numbers);
		}
	}, []);

	const today = startOfToday();
	const date = format(new Date(), "dd-MM-yyyy");


	if (numbers.length != 0)
		return (
			<Link href={"/calendar"} className="rounded-3xl md:col-span-1 xs:rounded-4xl justify-around bg-MainGreen py-2 xs:py-2 px-3 flex flex-col items-center">
				{isSaturday(today) || isSunday(today) ? (
					<p
						className={`text-white text-xs 2xs:text-sm xl:text-xl md:text-lg lg:text-left text-center sm:text-2xl xs:text-lg 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl md:leading-7 ${poppingsFont800.className}`}
					>
						Przyszłe numerki
					</p>
				) : (
					<div className="flex gap-1 flex-col sm:gap-4 2xl:gap-7 2xs:flex-row lg:gap-4 2xs:gap-x-2 items-center md:gap-2 justify-between">
						<p
							className={`text-MainDarkGray rounded-full 3xl:text-6xl 4xl:p-5 3xl:w-[100px] 4xl:w-[100px] xs:text-3xl 2xl:p-4 lg:p-2.5 3xl:p-5 lg:w-[60px] lg:text-4xl sm:text-4xl md:p-1 sm:p-3.5 xs:p-2.5 md:text-2xl text-lg 2xl:text-5xl 2xl:w-[80px] bg-white xs:w-14 sm:w-[68px] text-center md:w-10 w-[36px] p-1 ${plusJakartaSansFont800.className}`}
						>
							{numbers.filter((number) => number.date == date)[0]?.number ?? "-"}
						</p>

						<p
							className={`text-white text-xs 2xs:text-sm xl:text-xl 2xs:text-left md:text-lg lg:text-left text-center md:text-center xs:text-left sm:text-2xl xs:text-lg 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl md:leading-7 ${poppingsFont800.className}`}
						>
							Szczęśliwy <br />
							numerek
						</p>
					</div>
				)}

				<div
					className={`${
						isSaturday(today) || isSunday(today) ? "flex gap-x-0.5 2xs:gap-x-1" : "2xs:flex hidden md:hidden lg:flex gap-x-1"
					} bg-white w-fit text-2xs lg:text-xs lg:gap-x-1.5 3xl:text-xl xl:gap-x-3 3xl:gap-x-4 xl:text-base sm:text-lg xs:text-base xs:gap-x-2 text-center 2xl:p-1.5 rounded-full p-1 ${
						plusJakartaSansFont800.className
					}`}
				>
					{numbers.map((number, i) => (
						<div
							key={i}
							className={`w-[21px] xs:w-[30px] lg:w-7 xl:w-9 sm:w-10 sm:p-1.5 2xl:p-2 2xl:w-10 3xl:w-11 4xl:p-2 bg-LightPurple rounded-full p-0.75 ${
								number.date == date ? "bg-MainPurple text-white" : ""
							}`}
						>
							{number.number}
						</div>
					))}
				</div>
			</Link>
		);
	else
		return (
			<div className="rounded-3xl md:col-span-1 xs:rounded-4xl justify-around bg-MainGreen py-2 xs:py-2 px-3 flex flex-col items-center">
				<div className="animate-pulse flex gap-1 flex-col sm:gap-4 2xl:gap-7 2xs:flex-row lg:gap-4 2xs:gap-x-2 items-center md:gap-2 justify-between">
					<div className={`rounded-full 3xl:w-[100px] 4xl:w-[100px] aspect-square lg:w-[60px] 2xl:w-[80px] bg-white xs:w-14 sm:w-[68px] md:w-10 w-[36px]`}></div>
					<div className="flex flex-col gap-y-1 items-center lg:items-start md:items-center 2xs:items-start md:gap-y-2">
						<div className="bg-white h-2.5 2xs:h-3 xs:h-4 xl:h-5 sm:h-6 md:h-4 2xl:h-6 3xl:h-7 4xl:h-9 w-14 xs:w-20 sm:w-28 md:w-20 lg:w-28 xl:w-32 3xl:w-40 rounded-md"></div>
						<div className="bg-white h-2.5 2xs:h-3 xs:h-4 xl:h-5 sm:h-6 md:h-4 2xl:h-6 3xl:h-7 4xl:h-9 w-12 xs:w-16 sm:w-24 md:w-16 lg:w-24 xl:w-28 3xl:w-36 rounded-md"></div>
					</div>
				</div>

				<div
					className={`animate-pulse bg-white w-fit 2xs:flex lg:gap-x-1.5 xl:gap-x-3 3xl:gap-x-4 hidden md:hidden lg:flex gap-x-1 xs:gap-x-2 2xl:p-1.5 rounded-full p-1`}
				>
					{[...Array(5)].map((number, i) => (
						<div key={i} className="w-[21px] aspect-square xs:w-[30px] lg:w-7 xl:w-9 sm:w-10 sm:p-1.5 2xl:w-11 3xl:w-11 bg-LightPurple rounded-full"></div>
					))}
				</div>
			</div>
		);
}
