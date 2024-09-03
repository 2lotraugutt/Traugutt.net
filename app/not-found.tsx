import Link from "next/link";

export default function Error() {
	return (
		<div className="dashboard-page">
			<h1 className={`text-MainDarkGray text-center text-2xl xs:text-3xl md:text-4xl lg:text-5xl xl:text-6xl poppinsFont700`}>Chyba źle trafiłeś...</h1>

			<h3 className={`text-SecondColor text-center text-sm xs:text-md md:text-lg lg:text-xl xl:text-3xl poppinsFont900`}>
				Przykro nam, ale nie udało się nam znaleźć takiej strony
			</h3>

			<Link
				href={"/"}
				className={`bg-MainColor w-fit mx-auto px-10 md:px-20 my-5 py-3 text-white rounded-3xl text-sm xs:text-md md:text-lg lg:text-xl xl:text-3xl plusJakartaSans800`}
			>
				Powrót na stronę główna!
			</Link>
		</div>
	);
}
