import removeMarkdown from "@/lib/removeMarkdown";
import Link from "next/link";

export default function TopPostTile(props: { postData: JustPostDataType; index: number }) {
	return (
		<Link href={"/post/" + props.postData.id} className="group h-fit overflow-hidden cursor-pointer relative rounded-3xl xs:rounded-4xl aspect-[25/16]">
			<div
				className={`bg-white z-10 text-MainDarkGray absolute top-4 xs:top-8 left-4 xs:left-8 w-fit text-xs sm:text-base 2xl:text-xl rounded-2xl py-0.75 px-4 sm:px-8 plusJakartaSans800`}
			>
				TOP #{props.index}
			</div>

			<img className="w-full h-full object-cover absolute" src={props.postData.titleImage} alt="Top 1 image" height={1080} width={1920} />

			<div className="w-full rounded-3xl xs:rounded-4xl aspect-[25/16] bg-MainDarkGray "></div>

			<div className="from-MainDarkGray/95 to-MainDarkGray bg-gradient-to-b flex flex-col text-white 2xs:group-hover:-translate-y-full duration-300 ease-out transition-all -translate-y-10">
				<h3
					className={`from-MainDarkGray/0 via-MainDarkGray/80 bg-gradient-to-b 3xl:text-4xl line-clamp-2 md:text-lg 4xl:text-3xl to-MainDarkGray/95 pt-4 w-full text-base xs:text-2xl lg:text-3xl absolute 2xs:-translate-y-full -translate-y-2/3 xs:px-6 md:px-8 left-0 px-3 poppinsFont700`}
				>
					{props.postData.title}
				</h3>

				<p
					className={`group-hover:delay-75 text-transparent ease-out duration-300 md:line-clamp-4 lg:line-clamp-6 transition-all w-full line-clamp-6 2xs:group-hover:text-white 4xl:text-lg 2xl:text-base 2xl:mt-4 text-sm mt-2 mb-8 xs:px-6 md:px-8 px-3 poppinsFont400`}
				>
					{removeMarkdown(props.postData.content ?? "")}
				</p>
			</div>
		</Link>
	);
}
