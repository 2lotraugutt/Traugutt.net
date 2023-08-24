export default function PostTileSkeleton() {
	return (
		<div className="relative w-full rounded-3xl xs:rounded-4xl aspect-[25/16] bg-MainDarkGray">
			<div className="bg-white/80 absolute top-4 xs:top-8 left-4 xs:left-8 w-1/4 h-[7%] animate-pulse rounded-2xl"></div>

			<div className="w-4/5 h-4 xs:h-6 xs:left-7 xs:bottom-14 md:h-5 md:bottom-12 md:rounded-md 2xl:rounded-lg lg:bottom-16 2xl:bottom-20 3xl:bottom-24 lg:h-7 3xl:h-9 4xl:h-8 bg-white animate-pulse bottom-10 absolute left-4 rounded-sm"></div>
			<div className="w-2/3 h-4 xs:h-6 xs:left-7 xs:bottom-6 md:h-5 lg:h-7 3xl:h-9 md:rounded-md 2xl:rounded-lg lg:bottom-8 2xl:bottom-11 3xl:bottom-14 4xl:h-8 bg-white/70 animate-pulse bottom-5 absolute left-4 rounded-sm"></div>
		</div>
	);
}
