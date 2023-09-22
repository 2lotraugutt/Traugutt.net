import EventComponent from "./eventComponent";

export default function EventsContainer(props: { events: EventDataType[] }) {
	return (
		<div className="flex-col relative justify-end items-center grow hidden md:flex w-full gap-0.5 xl:gap-1 3xl:gap-1.5">
			{props.events.map((event, i) => (
				<EventComponent key={i} event={event} len={props.events.length} />
			))}
		</div>
	);
}
