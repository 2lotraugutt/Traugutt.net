import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import Link from "next/link";

const plusJakartaSansFont800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});

const poppingsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});

export default function DashboardPostTile(props: { postData: PostDataTypeWithAuthor }) {
	const months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];

	let date = new Date(props.postData.createdAt);
	const dateToDisplay = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
	return (
		<Link
			href={"/post/" + props.postData.id}
			className="group h-fit w-full items-center border-2 hover:bg-LightGray/20 transition-all duration-300 p-4 px-8 flex gap-x-4 rounded-2xl"
		>
			<div
				className={`w-32 flex-none text-center rounded-lg py-1 ${props.postData.published ? "text-MainGreen bg-LightGreen" : "text-MainPurple bg-LightPurple"} ${
					plusJakartaSansFont800.className
				}`}
			>
				{props.postData.published ? "Publiczy" : "Nie publiczny"}
			</div>
			<p className={`truncate ${poppingsFont600.className}`}>{props.postData.title}</p>
			<p className="flex-none me-auto">{dateToDisplay}</p>

			<p className={poppingsFont600.className}>{props.postData.views}</p>
			<p className={`flex-none ${poppingsFont500.className}`}>{props.postData.author.name}</p>

			<Link href={"dashboard/post/" + props.postData.id}>
				<FontAwesomeIcon icon={faPen} className="h-5 w-5 text-MainDarkGray hover:text-white transition-all hover:bg-MainDarkGray/70 p-2 rounded-lg" />
			</Link>
		</Link>
	);
}
