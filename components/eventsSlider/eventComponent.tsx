import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function EventComponent(props: { event: EventDataTypeWithPost }) {
	const router = useRouter();

	return (
		<div className={`flex rounded-3xl items-center border-[1px] border-SecondColor border-dotted p-3.5 lg:p-7 gap-x-3 sm:gap-x-4 lg:gap-x-5`}>
			<p
				className={`w-[48px] sm:w-[52px] text-lg sm:text-xl lg:text-2xl text-SecondColor bg-LightColor rounded-full p-2.5 sm:p-3 lg:p-3.5 lg:w-[60px] text-center poppinsFont700`}
			>
				{props.event.date.slice(0, 2)}
			</p>

			<div className="flex flex-col gap-y-1.5 w-full">
				<div className="flex items-center justify-between grow">
					<p className={`whitespace-nowrap text-sm sm:text-base lg:text-lg poppinsFont700`}>{props.event.name}</p>

					{props.event.post && (
						<FontAwesomeIcon
							icon={faLink}
							onClick={() => router.push("/post/" + props.event.post?.id)}
							className="bg-LightColor text-MainDarkGray cursor-pointer hover:bg-MainColor transition-all rounded-full aspect-square p-1.5 ms-7"
						/>
					)}
				</div>

				<div className="flex gap-x-2">
					{props.event.tags.map((tag, i) => (
						<div
							onClick={() => router.push("/calendar?tag=" + tag.id)}
							key={tag.id}
							className={`flex cursor-pointer h-fit rounded-3xl py-1 gap-x-2 px-2 sm:px-3 bg-LightGray/30 items-center transition-color duration-300`}
						>
							<div className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-color duration-300`} style={{ backgroundColor: tag.color }} />

							<p className={`text-2xs whitespace-nowrap text-MainDarkGray sm:text-xs md:text-sm transition-color duration-300 poppinsFont500`}>{tag.name}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
