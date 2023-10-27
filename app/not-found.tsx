import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import Link from "next/link";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});
const plusJakartaSans800 = Plus_Jakarta_Sans({
	weight: "600",
	subsets: ["latin"],
});
const poppingsFont900 = Poppins({
	weight: "900",
	subsets: ["latin"],
});

export default function Error() {
	return (
		<div className="dashboard-page">
			<h1 className={`text-MainDarkGray text-center text-2xl xs:text-3xl md:text-4xl lg:text-5xl xl:text-6xl ${poppingsFont700.className}`}>Chyba źle trafiłeś...</h1>

			<h3 className={`text-SecondColor text-center text-sm xs:text-md md:text-lg lg:text-xl xl:text-3xl ${poppingsFont900.className}`}>
				Przykro nam, ale nie udało się nam znaleźć takiej strony
			</h3>

			<Link
				href={"/"}
				className={`bg-MainColor w-fit mx-auto px-10 md:px-20 my-5 py-3 text-white rounded-3xl text-sm xs:text-md md:text-lg lg:text-xl xl:text-3xl ${plusJakartaSans800.className}`}
			>
				Powrót na stronę główna!
			</Link>
		</div>
	);
}
