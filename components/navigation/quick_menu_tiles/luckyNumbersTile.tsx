import { Plus_Jakarta_Sans, Poppins } from "next/font/google";

const plusJakartaSansFont800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

const poppingsFont800 = Poppins({
	weight: "800",
	subsets: ["latin"],
});

export default function LuckyNumbersTile(props: { numbers: number[] }) {
	return (
		<div className="rounded-3xl md:col-span-1 xs:rounded-4xl gap-y-3 bg-MainGreen py-2 px-3 flex flex-col items-center justify-around">
			<div className="flex gap-1 flex-col sm:gap-4 2xl:gap-7 lg:flex-row lg:gap-4 items-center md:gap-2">
				<p
					className={`text-MainDarkGray rounded-full 3xl:text-6xl 4xl:p-5 3xl:p-4 3xl:w-[92px] 4xl:w-[100px] xs:text-3xl lg:p-2.5 lg:w-[60px] lg:text-4xl sm:text-4xl md:p-1 sm:p-3.5 xs:p-2.5 md:text-2xl text-lg 2xl:text-5xl 2xl:w-[68px] bg-white xs:w-14 sm:w-[68px] text-center md:w-10 w-[36px] p-1 ${plusJakartaSansFont800.className}`}
				>
					{props.numbers[0]}
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
				{props.numbers.slice(1).map((number) => (
					<div className="w-[26px] 3xl:w-10 2xl:p-1 2xl:w-8 3xl:p-1.5 bg-LightPurple rounded-full p-0.75">{number}</div>
				))}
			</div>
		</div>
	);
}
