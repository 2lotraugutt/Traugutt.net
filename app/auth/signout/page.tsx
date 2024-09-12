"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
	const { data: session, status } = useSession();
	const { push } = useRouter();

	if (status == "unauthenticated") push("/");

	return (
		<div className="w-screen top-0 left-0 z-20 absolute h-screen bg-white">
			<div className="w-full h-full absolute">
				<Image src="/Blob.svg" width="500" height="500" className="hidden xl:block absolute w-fit h-3/4 xl:left-32 2xl:left-72 top-1/2 -translate-y-1/2" alt="" />

				<Image src="/Wave-2.svg" width="1920" height="1080" className="xl:hidden absolute top-0 right-0 w-full h-full object-center object-cover" alt="" />
				<Image src="/Wave.svg" width="1920" height="1080" className="hidden xl:block absolute top-0 left-0 w-full h-full object-left object-cover" alt="" />
			</div>

			<div className="right-0 h-full absolute w-full xl:w-fit 3xl:w-2/5 flex items-center justify-center xl:px-12 2xl:px-20">
				<div className="p-4 md:p-20 text-center items-center flex flex-col gap-6 pb-12 md:pb-40 xl:gap-y-8 lg:pb-32">
					<Image src="/logo.png" width="250" height="100" alt="Logo icon" />

					<h1 className={`text-3xl sm:text-5xl xl:text-6xl poppinsFont700`}>Wyloguj się</h1>
					<h2 className={`text-base sm:text-lg -mt-3 xl:text-xl poppinsFont500`}>Czy jesteś pewien, że chcesz się wylogować?</h2>

					<button
						onClick={() => signOut({ callbackUrl: "/" })}
						className={`flex items-center sm:text-xl text-white bg-MainDarkGray transition-all duration-300 rounded-full border-4 border-MainDarkGray hover:border-white/60 hover:bg-MainColor px-10 py-2.5 poppinsFont700`}
					>
						Wyloguj się
					</button>
				</div>
			</div>
		</div>
	);
}
