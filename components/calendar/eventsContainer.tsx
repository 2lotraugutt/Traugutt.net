import { Poppins } from "next/font/google";

const poppingsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});

export default function EventsContainer(props: { events: EventDataType[] }) {
	return (
		<div className="flex-col hidden md:flex w-full">
			{props.events.map((event, i) => {
				return (
					<div
						key={i}
						className={`bg-MainPurple text-center text-2xs lg:text-xs xl:text-sm 3xl:text-base line-clamp-1 xl:line-clamp-2 py-1 px-2 xl:px-2.5 2xl:px-3 2xl:py-1.5 text-white rounded-lg ${poppingsFont500.className}`}
					>
						{event.name}
					</div>
				);
			})}
		</div>
	);
}
