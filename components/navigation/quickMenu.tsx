import TopOnePost from "./quick_menu_tiles/topOnePost";
import LuckyNumbersTile from "./quick_menu_tiles/luckyNumbersTile";
import CalendarTile from "./quick_menu_tiles/calendarTile";
import NewsTile from "./quick_menu_tiles/newsTile";

export default function QuickMenu() {
	return (
		<div className="w-full grid auto-rows-min grid-cols-2 grid-rows-4 md:grid-rows-2 md:grid-cols-4 gap-y-2.5 gap-x-[15px]">
			<TopOnePost
				id="000"
				title="That's the most popular post in this month"
				description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi eius modi quibusdam laboriosam facilis quaerat molestias. Quis, soluta assumenda quidem
						culpa excepturi natus in, facere eligendi amet inventore iusto repellendus architecto voluptatum, minima nihil nostrum enim! Modi sint nesciunt hic
						commodi ipsum itaque optio voluptatum fugiat eaque error architecto fuga ab, vero expedita possimus reprehenderit quLorem ipsum dolor, sit amet
						consectetur adipisicing elit. Animi eius modi quibusdam laboriosam facilis quaerat molestias. Quis, soluta assumenda quidem culpa excepturi natus in,
						facere eligendi amet inventore iusto repellendus architecto voluptatum, minima nihil nostrum enim! Modi sint nesciunt hic commodi ipsum itaque optio
						voluptatum fugiat eaque error architecto fuga ab, vero expedita possimus reprehenderit quLorem ipsum dolor, sit amet consectetur adipisicing elit.
						Animi eius modi quibusdam laboriosam facilis quaerat molestias. Quis, soluta assumenda quidem culpa excepturi natus in, facere eligendi amet inventore
						iusto repellendus architecto voluptatum, minima nihil nostrum enim!"
				image="/Archiwum.png"
			/>

			<NewsTile />

			<LuckyNumbersTile numbers={[5, 17, 24, 30, 6, 11, 28, 22]} />

			<CalendarTile />
		</div>
	);
}
