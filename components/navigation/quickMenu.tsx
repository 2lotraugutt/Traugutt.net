export default function QuickMenu() {
	return (
		<div className="w-full grid grid-cols-2 lg:grid-cols-4 grid-rows-4 lg:grid-rows-2 gap-y-2.5 gap-x-[15px]">
			<div className="bg-slate-500 aspect-video col-span-2 row-span-2 rounded-4xl"></div>
			<div className="row-span-2 rounded-4xl bg-PurplePattern bg-cover bg-center"></div>
			<div className="rounded-4xl bg-MainGreen"></div>
			<div className="rounded-4xl bg-MainDarkGray"></div>
		</div>
	);
}
