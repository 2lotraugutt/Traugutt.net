import SingleNotificationTile from "./singleNotificationTile";

export default function NotificationssTile() {
	return (
		<div className="rounded-3xl relative md:col-span-1 row-span-2 xs:rounded-4xl bg-PurplePattern bg-cover bg-center">
			<div className="absolute left-0 right-0 top-0 bottom-0 overflow-y-auto p-5">
				{[...Array(5)].map((e, i) => (
					<SingleNotificationTile key={i} />
				))}
			</div>
		</div>
	);
}
