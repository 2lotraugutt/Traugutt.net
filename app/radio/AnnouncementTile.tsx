function AnnouncementTile(props: { announcementData: AnnouncementWithAutorDataType }) {
	return (
		<div className="h-fit w-full text-left flex-col 2xl:flex-row 2xl:items-center group border-2 hover:bg-LightGray/40 transition-all duration-300 py-5 md:py-6 md:px-8 px-5 lg:py-8 lg:px-8 3xl:px-12 xl:py-9 flex gap-y-4 md:gap-y-6 lg:gap-y-10 xl:gap-x-10 rounded-2xl">
			<p> {props.announcementData.content} </p>

			<div className="flex gap-x-3">
				{props.announcementData.days.map((day) => (
					<p>{day.date}</p>
				))}
			</div>
		</div>
	);
}

export default AnnouncementTile;
