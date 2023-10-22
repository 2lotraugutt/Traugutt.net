"use client";

import { isWeekend } from "date-fns";
import { Plus_Jakarta_Sans } from "next/font/google";
import DayTile from "./dayTile";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const plusJakartaSansFont800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

export default function NumberTile(props: { day: number; number?: number; date: Date }) {
	const [number, setNumber] = useState<number | string>("");

	if (isWeekend(props.date)) {
		return <DayTile day={props.day} isWeekend={true} />;
	} else
		return (
			<div className={`relative day-tile !justify-between bg-LightColor/20 `}>
				<div className="flex justify-center sm:justify-between items-center w-full">
					<div className={`day-number ${plusJakartaSansFont800.className} bg-LightColor text-SecondColor`}>{props.day}</div>
					<div
						className={`outline-[3px] lg:outline-4 outline-LightColor me-0.5 lg:me-1 outline bg-LightColor/40 text-center w-[19px] md:w-6 lg:w-7 xl:w-9 3xl:w-10 4xl:w-11 h-fit p-0.5 md:p-1 xl:p-1.5 4xl:p-2 rounded-full text-2xs md:text-xs lg:text-sm xl:text-base 3xl:text-xl text-MainDarkGray ${
							plusJakartaSansFont800.className
						} ${!props.number ? "hidden" : "hidden sm:block"}`}
					>
						{props.number}
					</div>
				</div>

				<div className="flex lg:gap-x-3 gap-x-0.5 md:gap-2 w-full items-center justify-between">
					<input
						className="w-full outline-none border-[1px] p-0.5 md:px-2 md:py-0.5 rounded-lg border-DarkColor text-2xs xs:text-xs sm:text-sm md:text-base 3xl:text-xl"
						type="text"
						value={number}
						min={1}
						onChange={(e) => {
							const newNumber = Number(e.target.value);

							if (newNumber > 0 && newNumber < 40) setNumber(newNumber);
							else if (e.target.value == "") setNumber("");
							else setNumber((old) => old);
						}}
					/>
					<div className="flex cursor-pointer aspect-square items-center justify-center h-4 w-4 sm:w-5 sm:h-5 xs:w-6 xs:h-6 bg-DarkColor text-white transition-all duration-200 p-1 sm:p-1.5 lg:p-2.5 rounded-full hover:bg-LightColor hover:text-MainDarkGray">
						<FontAwesomeIcon icon={faCheck} />
					</div>
				</div>
			</div>
		);
}
