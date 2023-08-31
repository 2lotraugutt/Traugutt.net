import { getDate, isWeekend } from "date-fns";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSansFont800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

export default function DatabaseTile(props: { day: DayDataTypeWithEvents }) {
	if (isWeekend(props.day.timeStamp))
		return (
			<div className="aspect-[14/15] border-[1.5px] p-3.5 rounded-3xl border-dashed border-MainDarkGray bg-MediumGray/30">
				<div className={`bg-MediumGray p-1.5 text-center w-10 rounded-full text-xl text-MainDarkGray ${plusJakartaSansFont800.className}`}>{props.day.day}</div>
			</div>
		);
	else
		return (
			<div className="aspect-[14/15] border-[1.5px] p-3.5 rounded-3xl border-dashed border-MainPurple">
				<div className="flex justify-between items-center pe-1">
					<div className={`bg-LightPurple p-1.5 text-center w-10 rounded-full text-xl text-MainPurple ${plusJakartaSansFont800.className}`}>{props.day.day}</div>
					<div
						className={`outline-4 outline-LightPurple outline text-center w-8 h-fit p-1 rounded-full text-md text-MainDarkGray ${plusJakartaSansFont800.className}`}
					>
						{props.day.number}
					</div>
				</div>
			</div>
		);
}
