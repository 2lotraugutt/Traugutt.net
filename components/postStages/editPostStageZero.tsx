"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EditPostStageZero(props: { up: Function }) {
	const router = useRouter();
	return (
		<div className="dashboard-post-page">
			<Image src="/newPost/Wave-0.svg" width="1920" height="1080" className="absolute top-0 right-0 w-full h-full object-center object-cover" alt="" />
			<div className="flex flex-col gap-y-10 absolute top-1/2 max-w-xl -translate-y-1/2">
				<h1 className={`text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-center poppinsFont700`}>Edytuj post!</h1>
				<p className={`text-center px-5 text-xs xs:text-sm lg:text-base xl:text-xl 2xl:text-2xl poppinsFont400`}>
					Widzimi się już poraz kolejny. Mimo wszystko to bardzo dobrze, że edytujesz swoje posty! Dobrze jest cię tu widzieć ponownie. Idziemy dalej?
				</p>

				<div className="flex justify-between flex-col xs:flex-row gap-y-3 items-center mx-10">
					<button onClick={() => router.back()} className={`bg-MainDarkGray w-fit px-8 py-3 text-sm text-white rounded-3xl plusJakartaSans600`}>
						Anuluj
					</button>
					<button onClick={() => props.up()} className={`bg-MainColor w-fit px-8 py-3 text-sm text-white rounded-3xl plusJakartaSans600`}>
						Do roboty!
					</button>
				</div>
			</div>
		</div>
	);
}
