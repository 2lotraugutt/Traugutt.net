import SingleNotificationTile from "./singleNotificationTile";

export default function NotificationssTile() {
	return (
		<div className="rounded-3xl relative md:col-span-1 row-span-2 xs:rounded-4xl bg-PurplePattern bg-cover bg-center">
			<div className="absolute flex flex-col gap-0.5 lg:gap-1 left-0 right-0 top-0 bottom-0 overflow-y-auto p-2 xs:p-3 sm:p-4 md:p-2 lg:p-3.5 xl:p-5 3xl:p-7 4xl:p-9">
				{[...Array(5)].map((e, i) => (
					<SingleNotificationTile key={i} />
				))}
			</div>
		</div>
	);
}
