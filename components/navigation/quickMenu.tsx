import TopOnePost from "../quickMenuTiles/topOnePost";
import LuckyNumbersTile from "../quickMenuTiles/luckyNumbersTile";
import CalendarTile from "../quickMenuTiles/calendarTile";
import NotificationsTile from "../quickMenuTiles/notificationsTile";

export default function QuickMenu() {
	return (
		<div className="w-full grid auto-rows-min grid-cols-2 grid-rows-4 md:grid-rows-2 md:grid-cols-4 gap-y-2.5 gap-x-[15px]">
			<TopOnePost />

			<NotificationsTile />

			<LuckyNumbersTile />

			<CalendarTile />
		</div>
	);
}
