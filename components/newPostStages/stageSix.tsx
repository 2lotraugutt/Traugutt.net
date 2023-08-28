"use client";

import Image from "next/image";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";

const plusJakartaSans800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

const plusJakartaSans600 = Plus_Jakarta_Sans({
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

export default function StageSix(props: { down: Function; upload: Function; uploaded: boolean }) {
	return (
		<div className="dashboard-post-page">
			<Image src="/newPost/Wave-1.svg" width="1920" height="1080" className="absolute top-0 right-0 w-full h-full object-center object-cover" alt="" />
			<div className="flex flex-col items-center gap-y-10 absolute top-1/2 max-w-xl -translate-y-1/2">
				<div className="flex flex-col gap-y-3">
					<h1 className={`text-6xl text-center ${poppingsFont700.className}`}>Publikacja</h1>
					<p className={`text-center px-5 text-lg ${poppingsFont400.className}`}>
						Nareszcie nastał ten wyczekiwany moment.
						<br />
						<b className={`text-MainPurple ${poppingsFont600.className}`}>Możesz opublikować swój post!</b> To najwaniejszy element jego podrózy. Ten, na którego
						czekaliśmy tak bardzo!
					</p>
				</div>

				<div className="flex flex-col gap-y-3">
					<h3 className={`text-xl text-center ${poppingsFont600.className}`}>Czyń honory</h3>

					<button onClick={() => props.upload()} className={`bg-MainGreen text-2xl px-20 my-5 py-3 text-white rounded-3xl ${plusJakartaSans800.className}`}>
						Opublikuj!
					</button>
				</div>

				<div className="flex flex-col gap-y-6 justify-between w-full">
					<p className={`text-center px-5 text-sm ${props.uploaded ? "" : "hidden"} ${poppingsFont400.className}`}>
						Daj nam chwile na zweryfikowanie posta. <br /> Post powinien pojawić się na stronie maksymalnie po kilku dniach.
					</p>
					<button onClick={() => props.down()} className={`bg-MainDarkGray w-fit px-8 py-3 text-white rounded-3xl ${plusJakartaSans600.className}`}>
						Powrót
					</button>
				</div>
			</div>
		</div>
	);
}
