import Image from "next/image";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

const plusJakartaSansFont800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

const plusJakartaSansFont700 = Plus_Jakarta_Sans({
	weight: "700",
	subsets: ["latin"],
});

const poppingsFont800 = Poppins({
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

export default function QuickMenu() {
	return (
		<div className="w-full grid auto-rows-min grid-cols-2 grid-rows-4 md:grid-rows-2 md:grid-cols-4 gap-y-2.5 gap-x-[15px]">
			<div className="group col-span-2 row-span-2 md:col-span-2 overflow-hidden cursor-pointer relative rounded-3xl xs:rounded-4xl aspect-[25/16] ">
				<div
					className={`bg-white text-MainDarkGray absolute top-4 xs:top-8 left-4 xs:left-8 w-fit text-xs sm:text-base 2xl:text-xl rounded-2xl py-0.75 px-4 sm:px-8 ${plusJakartaSansFont800.className}`}
				>
					TOP #1
				</div>
				<Image className="w-full h-full object-cover" src={"/Archiwum.png"} alt="Top 1 image" height={1080} width={1920} />

				<div className="bg-MainDarkGray/80 flex flex-col text-white xs:group-hover:-translate-y-full transition-all -translate-y-10">
					<h3
						className={`from-MainDarkGray/0 via-MainDarkGray/50 bg-gradient-to-b 3xl:text-4xl md:text-lg 4xl:text-5xl to-MainDarkGray/80 pt-4 w-full text-base xs:text-2xl lg:text-3xl absolute xs:-translate-y-full -translate-y-2/3 xs:px-6 md:px-8 left-0 px-3 ${poppingsFont700.className}`}
					>
						That&apos;s the most popular post in this month
					</h3>

					<p
						className={`group-hover:delay-75 text-transparent transition-all w-full truncate-overflow xs:group-hover:text-white 4xl:text-lg 2xl:text-base 2xl:mt-4 text-sm mt-2 mb-8 xs:px-6 md:px-8 px-3 ${poppingsFont400.className}`}
					>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi eius modi quibusdam laboriosam facilis quaerat molestias. Quis, soluta assumenda quidem
						culpa excepturi natus in, facere eligendi amet inventore iusto repellendus architecto voluptatum, minima nihil nostrum enim! Modi sint nesciunt hic
						commodi ipsum itaque optio voluptatum fugiat eaque error architecto fuga ab, vero expedita possimus reprehenderit quLorem ipsum dolor, sit amet
						consectetur adipisicing elit. Animi eius modi quibusdam laboriosam facilis quaerat molestias. Quis, soluta assumenda quidem culpa excepturi natus in,
						facere eligendi amet inventore iusto repellendus architecto voluptatum, minima nihil nostrum enim! Modi sint nesciunt hic commodi ipsum itaque optio
						voluptatum fugiat eaque error architecto fuga ab, vero expedita possimus reprehenderit quLorem ipsum dolor, sit amet consectetur adipisicing elit.
						Animi eius modi quibusdam laboriosam facilis quaerat molestias. Quis, soluta assumenda quidem culpa excepturi natus in, facere eligendi amet inventore
						iusto repellendus architecto voluptatum, minima nihil nostrum enim!
					</p>
				</div>
			</div>
			<div className="rounded-3xl md:col-span-1 row-span-2 xs:rounded-4xl bg-PurplePattern bg-cover bg-center"></div>
			<div className="rounded-3xl md:col-span-1 xs:rounded-4xl gap-y-3 bg-MainGreen py-2 px-3 flex flex-col items-center justify-around">
				<div className="flex gap-1 flex-col sm:gap-4 2xl:gap-7 lg:flex-row lg:gap-4 items-center md:gap-2">
					<p
						className={`text-MainDarkGray rounded-full 3xl:text-6xl 4xl:p-5 3xl:p-4 3xl:w-[92px] 4xl:w-[100px] xs:text-3xl lg:p-2.5 lg:w-[60px] lg:text-4xl sm:text-4xl md:p-1 sm:p-3.5 xs:p-2.5 md:text-2xl text-lg 2xl:text-5xl 2xl:w-[68px] bg-white xs:w-14 sm:w-[68px] text-center md:w-10 w-[36px] p-1 ${plusJakartaSansFont800.className}`}
					>
						2
					</p>
					<p
						className={`text-white text-sm xl:text-xl lg:text-left md:text-lg text-center sm:text-2xl xs:text-lg 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl md:leading-7 ${poppingsFont800.className}`}
					>
						Szczęśliwy <br />
						numerek
					</p>
				</div>

				<div
					className={`bg-white w-fit text-sm xl:flex hidden gap-x-2.5 2xl:gap-x-3 2xl:text-base 3xl:text-lg text-center 2xl:p-1.5 rounded-full p-1 ${plusJakartaSansFont800.className}`}
				>
					<div className="w-[26px] 3xl:w-10 2xl:p-1 2xl:w-8 3xl:p-1.5 bg-LightPurple rounded-full p-0.75">21</div>
					<div className="w-[26px] 3xl:w-10 2xl:p-1 2xl:w-8 3xl:p-1.5 bg-LightPurple rounded-full p-0.75">32</div>
					<div className="w-[26px] 3xl:w-10 2xl:p-1 2xl:w-8 3xl:p-1.5 bg-LightPurple rounded-full p-0.75">3</div>
					<div className="w-[26px] 3xl:w-10 2xl:p-1 2xl:w-8 3xl:p-1.5 bg-LightPurple rounded-full p-0.75">12</div>
					<div className="w-[26px] 3xl:w-10 2xl:p-1 2xl:w-8 3xl:p-1.5 bg-LightPurple rounded-full p-0.75">19</div>
					<div className="w-[26px] 3xl:w-10 2xl:p-1 2xl:w-8 3xl:p-1.5 bg-LightPurple rounded-full p-0.75">25</div>
					<div className="w-[26px] 3xl:w-10 2xl:p-1 2xl:w-8 3xl:p-1.5 bg-LightPurple rounded-full p-0.75">7</div>
				</div>
			</div>

			<div className="rounded-3xl md:col-span-1 xs:rounded-4xl gap-y-3 bg-MainDarkGray py-2 3xl:px-12 px-3 xl:items-start xl:px-8 flex flex-col items-center justify-around">
				<div className="flex gap-2 flex-col sm:gap-5 2xl:gap-7 lg:flex-row lg:gap-5 items-center md:gap-3">
					<FontAwesomeIcon icon={faCalendarDays} className="text-white w-6 xs:w-10 sm:w-14 md:w-7 lg:w-11 xl:w-12 2xl:w-14 3xl:w-16 4xl:w-[70px]" />

					<p
						className={`text-white text-sm xl:text-xl lg:text-left md:text-lg text-center sm:text-2xl xs:text-lg 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl md:leading-7 ${poppingsFont800.className}`}
					>
						Kalendarz <br />
						wydarzeń
					</p>
				</div>

				<div className={`w-full xl:flex hidden gap-x-3 flex-row items-center ${plusJakartaSansFont700.className}`}>
					<FontAwesomeIcon
						icon={faBell}
						className="text-MainDarkGray bg-white h-8 w-8 2xl:w-10 2xl:h-10 3xl:w-12 2xl:p-2 4xl:p-3 3xl:h-12 4xl:w-14 4xl:h-14 p-1.5 rounded-full"
					/>
					<p className="flex flex-col text-white text-xs 2xl:text-sm w-full 3xl:text-base truncate 4xl:text-lg">
						Za 3 dni imieniny obchodzi
						<span className="text-sm 2xl:text-base 4xl:text-xl 3xl:text-lg text-MainGreen truncate">Jarosław Skrzypczyk</span>
					</p>
				</div>
			</div>
		</div>
	);
}
