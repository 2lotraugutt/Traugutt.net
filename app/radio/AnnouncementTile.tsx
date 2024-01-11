function AnnouncementTile(props: { announcementData: AnnouncementWithAutorDataType }) {
	return (
		<div className="h-fit w-full text-xs xs:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl text-left flex-col 2xl:flex-row 2xl:items-center group border-2 hover:bg-LightGray/40 transition-all duration-300 py-5 md:py-6 md:px-8 px-5 lg:py-8 lg:px-8 3xl:px-12 xl:py-9 flex gap-y-4 md:gap-y-6 lg:gap-y-10 xl:gap-x-10 rounded-2xl">
			<p> {props.announcementData.content} </p>

			<p className="ms-auto">
				<span className="font-bold">Autor: </span>
				{props.announcementData.author.name}
			</p>
		</div>
	);
}

export default AnnouncementTile;
