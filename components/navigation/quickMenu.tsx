import TopOnePost from "./quick_menu_tiles/topOnePost";
import LuckyNumbersTile from "./quick_menu_tiles/luckyNumbersTile";
import CalendarTile from "./quick_menu_tiles/calendarTile";
import NewsTile from "./quick_menu_tiles/newsTile";

export default function QuickMenu() {
	return (
		<div className="w-full grid auto-rows-min grid-cols-2 grid-rows-4 md:grid-rows-2 md:grid-cols-4 gap-y-2.5 gap-x-[15px]">
			<TopOnePost />

			<NewsTile />

			<LuckyNumbersTile />

			<CalendarTile />
		</div>
	);
}
