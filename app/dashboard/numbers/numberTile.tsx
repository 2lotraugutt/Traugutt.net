import { isWeekend } from "date-fns";
import { Plus_Jakarta_Sans } from "next/font/google";
import DayTile from "./dayTile";

const plusJakartaSansFont800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

export default function NumberTile(props: { day: number; number?: number; date: Date }) {
	if (isWeekend(props.date)) {
		return <DayTile day={props.day} isWeekend={true} />;
	} else
		return (
			<div className={`relative day-tile md:!justify-between bg-LightColor/20 `}>
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
			</div>
		);
}
