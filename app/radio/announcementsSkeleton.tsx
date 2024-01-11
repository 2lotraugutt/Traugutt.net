export default function AnnouncementsSkeleton() {
	return (
		<div className="flex w-full flex-col overflow-hidden lg:px-12 px-2 md:px-5 4xl:px-0 gap-y-3 sm:gap-y-5 xl:gap-y-7 3xl:gap-y-9 items-center">
			<div className="animate-pulse 3xl:h-20 h-8 w-1/2 xl:mt-9 mb-6 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20 sm:h-12 xl:h-16 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>

			<div className="flex flex-col gap-y-4 w-full md:gap-2 lg:gap-4 xl:gap-5 4xl:gap-7">
				{[...Array(12)].map((i) => (
					<div
						key={i}
						className="animate-pulse h-fit w-full py-5 md:py-6 md:px-8 px-5 lg:py-8 lg:px-8 3xl:px-12 xl:py-9 text-xs xs:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl text-left flex-col 2xl:flex-row 2xl:items-center group border-2 hover:bg-LightGray/40 transition-all duration-300 flex rounded-2xl"
					>
						<div className="3xl:h-5 h-3 sm:h-4 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
						<div className="3xl:h-5 h-3 sm:h-4 w-10/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
						<div className="3xl:h-5 h-3 sm:h-4 w-11/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
						<div className="3xl:h-5 h-3 sm:h-4 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
						<div className="3xl:h-5 h-3 sm:h-4 w-7/12 xl:h-5 bg-MainDarkGray/60 rounded-sm my-0.5 xl:my-1"></div>
					</div>
				))}
			</div>
		</div>
	);
}
