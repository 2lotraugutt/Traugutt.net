export default function PostSkeleton() {
	return (
		<>
			<div className="relative">
				<div className="aspect-[16/12] w-full md:aspect-[16/9] xl:aspect-[2] 2xl:aspect-[16/7] bg-MainDarkGray"></div>

				<div className="flex bg-gradient-to-t md:gap-y-2.5 sm:gap-y-2 from-MainDarkGray via-MainDarkGray/80 to-MainDarkGray/0 flex-col absolute text-white left-0 bottom-0 pb-4 px-3 xl:pb-20 xs:px-7 md:pb-12 lg:px-24 lg:pb-14 xl:px-28 md:px-16 xs:pb-6 2xs:px-5 sm:px-10 sm:pb-9 2xl:px-48 3xl:px-64 4xl:px-80 w-full gap-y-1 xl:gap-y-4">
					<div className="flex flex-row items-center gap-x-2 xl:gap-x-4 animate-pulse">
						<div className="h-3 bg-white/80 w-1/12 rounded-sm md:h-4 3xl:h-5 4xl:h-6"></div>

						<div className="bg-white xl:h-1.5 w-1 xl:w-1.5 h-1 rounded-full"></div>

						<div className="h-2.5 bg-white/80 w-1/12 rounded-sm md:h-3.5 3xl:h-4 4xl:h-5"></div>
					</div>

					<div className="bg-white/80 4xl:h-14 rounded animate-pulse h-4 2xs:text-lg sm:h-5 md:h-6 lg:h-7 xl:h-1 2xl:h-12 w-11/12"></div>
					<div className="bg-white/80 4xl:h-14 rounded animate-pulse h-4 2xs:text-lg sm:h-5 md:h-6 lg:h-7 xl:h-1 2xl:h-12 w-7/12"></div>
				</div>
			</div>

			<div className="px-3 xs:px-7 flex-col flex gap-y-1 md:gap-y-2 xl:gap-y-3 3xl:gap-y-5 lg:px-24 xl:px-28 md:px-16 2xs:px-5 sm:px-10 2xl:px-48 3xl:px-64 4xl:px-80 py-4 xl:py-20 md:py-12 lg:py-14 sm:py-9 xs:py-6"></div>
		</>
	);
}
