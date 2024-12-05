import CalendarTile from "../quickMenuTiles/calendarTile";
import LuckyNumbersTile from "../quickMenuTiles/luckyNumbersTile";
import NotificationsTile from "../quickMenuTiles/notificationsTile";
import TopOnePost from "../quickMenuTiles/topOnePost";

export default function QuickMenu() {
	return (
		<div className="w-full grid auto-rows-min grid-cols-2 grid-rows-4 md:grid-rows-2 md:grid-cols-4 gap-y-2.5 gap-x-2.5">
			<TopOnePost />

			<NotificationsTile />

			<LuckyNumbersTile />

			<CalendarTile />
		</div>
	);
}
