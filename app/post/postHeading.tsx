import { faLink, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PostHeading(props: { post: PostDataType }) {
	function returnDate() {
		const months = ["Stycznia", "Lutego", "Marca", "Kwietnia", "Maja", "Czerwca", "Lipca", "Sierpnia", "Września", "Października", "Listopada", "Grudnia"];

		let date = new Date(props.post.createdAt);
		return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
	}

	function returnViews() {
		const views = props.post.views;
		if (views == 1) return views + " wyświetlenie";
		else if (views < 5) return views + " wyświetlenia";
		else return views + " wyświetleń";
	}

	return (
		<div className="relative">
			<img
				alt="Title image"
				src={props.post.titleImage}
				width={1920}
				height={1080}
				className="aspect-[16/12] w-full absolute top-0  md:aspect-[16/9] xl:aspect-[2] 2xl:aspect-[16/7] object-cover"
			/>
			<div className="aspect-[16/12] w-full md:aspect-[16/9] xl:aspect-[2] 2xl:aspect-[16/7] bg-MainDarkGray"></div>

			{(props.post.eventId || props.post.pinned) && (
				<div className="flex items-center gap-4 xs:gap-5 bg-white z-10 text-MainDarkGray absolute top-4 xs:top-8 right-4 xs:right-8 w-fit text-xs xl:text-base 4xl:text-base 2xl:text-lg 3xl:px-6 rounded-2xl sm:py-1.5 lg:py-2 py-1 px-1.5 sm:px-3">
					{props.post.eventId && <FontAwesomeIcon icon={faLink} />}
					{props.post.pinned && <FontAwesomeIcon icon={faThumbTack} />}
				</div>
			)}

			<div className="flex bg-gradient-to-t md:gap-y-2.5 sm:gap-y-2 from-MainDarkGray via-MainDarkGray/80 to-MainDarkGray/0 flex-col absolute text-white left-0 bottom-0 pb-4 px-3 xl:pb-20 xs:px-7 md:pb-12 lg:px-24 lg:pb-14 xl:px-28 md:px-16 xs:pb-6 2xs:px-5 sm:px-10 sm:pb-9 2xl:px-48 3xl:px-64 4xl:px-80 w-full gap-y-1 xl:gap-y-4">
				<div className="flex flex-row items-center gap-x-2 xl:gap-x-4">
					<p className={`text-xs sm:text-sm md:text-base 3xl:text-lg 4xl:text-xl poppinsFont600`}>{props.post.author.name}</p>

					<div className="bg-white xl:h-1.5 w-1 xl:w-1.5 h-1 rounded-full"></div>

					<p className={`text-xs md:text-sm 4xl:text-lg poppinsFont400`}>{returnDate()}</p>

					<div className="bg-white xl:h-1.5 w-1 xl:w-1.5 h-1 rounded-full"></div>

					<p className={`text-xs md:text-sm 4xl:text-lg poppinsFont400`}>{returnViews()}</p>
				</div>

				<h1
					className={`4xl:text-6xl text-base 2xs:text-lg !leading-[150%] h-fit sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl peer line-clamp-2 tracking-wide poppinsFont700`}
				>
					{props.post.title}
				</h1>
			</div>
		</div>
	);
}
