import { Poppins } from "next/font/google";

const poppingsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function EventComponent(props: { event: EventDataType }) {
	return (
		<div className={`flex rounded-3xl items-center border-[1px] border-MainPurple border-dotted p-7 gap-x-5`}>
			<p className={`text-2xl text-MainPurple bg-LightPurple rounded-full p-3.5 w-[60px] text-center ${poppingsFont700.className}`}>{props.event.date.slice(0, 2)}</p>
			<div className="flex flex-col gap-y-1.5">
				<p className={`whitespace-nowrap text-lg ${poppingsFont700.className}`}>{props.event.name}</p>

				<div className="flex gap-x-2">
					{props.event.tags.map((tag, i) => (
						<div key={tag.id} className={`flex h-fit rounded-3xl py-1 gap-x-2 px-2 sm:px-3 bg-LightGray/30 items-center transition-color duration-300`}>
							<div className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-color duration-300`} style={{ backgroundColor: tag.color }} />

							<p className={`text-2xs whitespace-nowrap text-MainDarkGray sm:text-xs md:text-sm transition-color duration-300 ${poppingsFont500.className}`}>
								{tag.name}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
