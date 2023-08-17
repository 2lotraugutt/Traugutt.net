import Image from "next/image";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";

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

export default function QuickMenu() {
	return (
		<div className="w-full grid grid-cols-2 lg:grid-cols-4 grid-rows-4 lg:grid-rows-2 gap-y-2.5 gap-x-[15px]">
			<div className="group overflow-hidden cursor-pointer relative rounded-4xl aspect-[25/16] col-span-2 row-span-2">
				<div className={`bg-white text-MainDarkGray absolute top-8 left-8 w-fit rounded-2xl py-0.75 px-8 ${plusJakartaSansFont800.className}`}>TOP #1</div>
				<Image className="w-full h-full object-cover" src={"/Archiwum.png"} alt="Top 1 image" height={1080} width={1920} />

				<div className="bg-MainDarkGray/80 px-8 flex flex-col text-white group-hover:-translate-y-full transition-all -translate-y-10">
					<h3
						className={`from-MainDarkGray/0 via-MainDarkGray/50 bg-gradient-to-b to-MainDarkGray/80 pt-4 w-full text-2xl absolute -translate-y-full left-0 px-8 ${poppingsFont700.className}`}
					>
						That's the most popular post in this month
					</h3>

					<p
						className={`group-hover:delay-75 text-transparent transition-all w-full truncate-overflow group-hover:text-white text-sm mt-2 mb-8 ${poppingsFont400.className}`}
					>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi eius modi quibusdam laboriosam facilis quaerat molestias. Quis, soluta assumenda quidem
						culpa excepturi natus in, facere eligendi amet inventore iusto repellendus architecto voluptatum, minima nihil nostrum enim! Modi sint nesciunt hic
						commodi ipsum itaque optio voluptatum fugiat eaque error architecto fuga ab, vero expedita possimus reprehenderit quLorem ipsum dolor, sit amet
						consectetur adipisicing elit. Animi eius modi quibusdam laboriosam facilis quaerat molestias. Quis, soluta assumenda quidem culpa excepturi natus in,
						facere eligendi amet inventore iusto repellendus architecto voluptatum, minima nihil nostrum enim! Modi sint nesciunt hic commodi ipsum itaque optio
						voluptatum fugiat eaque error architecto fuga ab, vero expedita possimus reprehenderit quLorem ipsum dolor, sit amet consectetur adipisicing elit.
						Animi eius modi quibusdam laboriosam facilis quaerat molestias. Quis, soluta assumenda quidem culpa excepturi natus in, facere eligendi amet inventore
						iusto repellendus architecto voluptatum, minima nihil nostrum enim! Modi sint nesciunt hic commodi ipsum itaque optio voluptatum fugiat eaque error
						architecto fuga ab, vero expedita possimus reprehenderit quLorem ipsum dolor, sit amet consectetur adipisicing elit. Animi eius modi quibusdam
						laboriosam facilis quaerat molestias. Quis, soluta assumenda quidem culpa excepturi natus in, facere eligendi amet inventore iusto repellendus
						architecto voluptatum, minima nihil nostrum enim! Modi sint nesciunt hic commodi ipsum itaque optio voluptatum fugiat eaque error architecto fuga ab,
						vero expedita possimus reprehenderit quLorem ipsum dolor, sit amet consectetur adipisicing elit. Animi eius modi quibusdam laboriosam facilis quaerat
						molestias. Quis, soluta assumenda quidem culpa excepturi natus in, facere eligendi amet inventore iusto repellendus architecto voluptatum, minima nihil
						nostrum enim! Modi sint nesciunt hic commodi ipsum itaque optio voluptatum fugiat eaque error architecto fuga ab, vero expedita possimus reprehenderit
						qu
					</p>
				</div>
			</div>

			<div className="row-span-2 rounded-4xl bg-PurplePattern bg-cover bg-center"></div>
			<div className="rounded-4xl bg-MainGreen"></div>
			<div className="rounded-4xl bg-MainDarkGray"></div>
		</div>
	);
}
