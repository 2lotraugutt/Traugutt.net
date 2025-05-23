import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

export default function DayTile(props: { day: number; isWeekend: boolean }) {
	return (
		<div className={`day-tile !aspect-square lg:!aspect-[5/4] p-2 ${props.isWeekend ? "bg-MediumGray/30 !hidden xs:!block" : "bg-MediumGray/10"} `}>
			<div
				className={`day-number bg-LightGray ${!props.isWeekend ? "bg-LightGray text-MainDarkGray/50" : "bg-MediumGray text-MainDarkGray/70"} ${plusJakartaSans800.className}`}
			>
				{props.day}
			</div>
		</div>
	);
}
