"use client";

import FreeDaysCalendar from "@/components/dashboard/freeDaysCalendar";
// import LoadingLayout from "@/components/dashboard/loadingLayout";
import { useRouter } from "next/navigation";
import { getYear, startOfToday } from "date-fns";
import { getSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function Page() {
	const [yearsCount, setYearsCount] = useState<number>(2);

	const today = startOfToday();
	const year = getYear(today);
	const router = useRouter();

	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			if (session) {
				if (!session.user.role.manageCalendar) router.push("/dashboard");
			} else router.push("/");
		}
		initFunction();
	}, []);

	return (
		<div className="dashboard-page">
			<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Wydarzenia</h1>
			<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Dni wolne</h1>
			{[...Array(yearsCount)].map((n, yearCount) => (
				<FreeDaysCalendar year={year + yearCount} key={year + yearCount} />
			))}

			<button
				onClick={() => setYearsCount((old) => old + 1)}
				className={`text-MainDarkGray bg-white border-MainDarkGray border-2 text-xs xs:text-sm md:text-base xl:text-lg px-8 py-1.5 2xl:text-lg 3xl:text-xl 3xl:py-2 3xl:px-12 rounded-3xl hover:bg-MainDarkGray hover:text-white transition-all duration-200 ease-out ${poppingsFont700.className}`}
			>
				Załaduj więcej
			</button>
		</div>
	);
	// else return <LoadingLayout />;
}
