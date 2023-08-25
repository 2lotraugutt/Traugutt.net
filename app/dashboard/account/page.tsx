import { Poppins } from "next/font/google";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function Page() {
	return (
		<div className="flex flex-col gap-y-10 sm:gap-y-12 py-20 3xl:gap-y-24 lg:gap-y-16 2xl:gap-y-20 md:gap-y-14 lg:px-12 px-2 md:px-5 4xl:px-0 bg-LightGray/30 border-y-2 border-LightGray/70">
			<h1 className={`text-MainDarkGray text-center text-6xl h-screen ${poppingsFont700.className}`}>Konto</h1>
		</div>
	);
}
