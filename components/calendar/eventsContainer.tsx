export default function EventsContainer(props: { events: EventDataType[] }) {
	return (
		<div className="flex-col hidden md:flex w-full">
			{props.events.map((event, i) => {
				return (
					<div key={i} className="bg-MainPurple text-2xs py-1 px-3 text-white rounded-lg">
						{event.name}
					</div>
				);
			})}
		</div>
	);
}
