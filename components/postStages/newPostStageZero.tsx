"use client";

import Image from "next/image";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
	weight: "600",
	subsets: ["latin"],
});

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});


const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});

const poppingsFont400 = Poppins({
	weight: "400",
	subsets: ["latin"],
});

export default function NewPostStageZero(props: { up: Function }) {
	const router = useRouter();
	return (
		<div className="dashboard-post-page">
			<Image src="/newPost/Wave-0.svg" width="1920" height="1080" className="absolute top-0 right-0 w-full h-full object-center object-cover" alt="" />
			<div className="flex flex-col gap-y-10 absolute top-1/2 max-w-lg md:max-w-xl lg:max-w-2xl -translate-y-1/2">
				<h1 className={`text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-center ${poppingsFont700.className}`}>Stworz nowy post</h1>
				<p className={`text-center px-5 text-xs xs:text-sm lg:text-base xl:text-xl 2xl:text-2xl ${poppingsFont400.className}`}>
					Tutaj zaczyna się przygoda twojego nowego postu! <br />
					Od tego momenu jego wygląd zależy tylko od ciebie. Mam nadzieję, że stowrzysz dzieło, które już niedługo pojawi się na stronie szkolnej!
					<b className={`text-MainPurple ${poppingsFont600.className}`}> Gotowy?</b>
				</p>

				<div className="flex justify-between flex-col xs:flex-row gap-y-3 items-center mx-10">
					<button onClick={() => router.back()} className={`bg-MainDarkGray w-fit px-8 py-3 text-sm text-white rounded-3xl ${plusJakartaSans.className}`}>
						Nie,&nbsp; zabierz mnie stąd
					</button>
					<button onClick={() => props.up()} className={`bg-MainGreen w-fit px-8 py-3 text-sm text-white rounded-3xl ${plusJakartaSans.className}`}>
						Tak,&nbsp; jestem gotowy!
					</button>
				</div>
			</div>
		</div>
	);
}
