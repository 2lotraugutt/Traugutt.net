import removeMarkdown from "@/lib/removeMarkdown";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const plusJakartaSansFont800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

const poppingsFont400 = Poppins({
	weight: "400",
	subsets: ["latin"],
});

export default function PostTile(props: { postData: PostDataType }) {
	const months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];

	let date = new Date(props.postData.createdAt);
	const dateToDisplay = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

	return (
		<Link href={"/post/" + props.postData.id} className="group h-fit overflow-hidden cursor-pointer relative rounded-3xl xs:rounded-4xl aspect-[25/16]">
			<div
				className={`bg-white z-10 text-MainDarkGray absolute top-4 xs:top-8 left-4 xs:left-8 w-fit text-xs xl:text-base 4xl:text-base 2xl:text-lg 3xl:px-8 rounded-2xl sm:py-1 py-0.75 px-3 sm:px-6 ${plusJakartaSansFont800.className}`}
			>
				{dateToDisplay}
			</div>

			<img className="w-full h-full object-cover absolute" src={props.postData.titleImage} alt="Top 1 image" height={1080} width={1920} />

			<div className="w-full rounded-3xl xs:rounded-4xl aspect-[25/16] bg-MainDarkGray "></div>

			<div className="bg-MainDarkGray/80 flex flex-col text-white 2xs:group-hover:-translate-y-full duration-300 ease-out transition-all -translate-y-10">
				<h3
					className={`from-MainDarkGray/0 via-MainDarkGray/50 bg-gradient-to-b 3xl:text-4xl line-clamp-2 md:text-lg 4xl:text-3xl to-MainDarkGray/80 pt-4 w-full text-base xs:text-2xl lg:text-3xl absolute 2xs:-translate-y-full -translate-y-2/3 xs:px-6 md:px-8 left-0 px-3 ${poppingsFont700.className}`}
				>
					{props.postData.title}
				</h3>

				<p
					className={`group-hover:delay-75 text-transparent ease-out duration-300 md:line-clamp-4 lg:line-clamp-6 transition-all w-full line-clamp-6 2xs:group-hover:text-white 4xl:text-lg 2xl:text-base 2xl:mt-4 text-sm mt-2 mb-8 xs:px-6 md:px-8 px-3 ${poppingsFont400.className}`}
				>
					{removeMarkdown(props.postData.content ?? "")}
				</p>
			</div>
		</Link>
	);
}
