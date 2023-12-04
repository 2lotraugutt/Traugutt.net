"use client";

import { getSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingLayout from "../loadingLayout";

const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});
const poppingsFont500 = Poppins({
	subsets: ["latin"],
	weight: "500",
});
const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

type SubpagesList = { link: string; name: string }[];
type RoutesType = {
	school: SubpagesList;
	student: SubpagesList;
	parents: SubpagesList;
	recruitation: SubpagesList;
	exam: SubpagesList;
	docs: SubpagesList;
};

export default function Page() {
	const [userSession, setSession] = useState<SessionDataType>();
	const [pages, setPages] = useState<{ file: string; content: string }[]>([]);
	const [routes, setRoutes] = useState<RoutesType>({
		school: [],
		student: [],
		parents: [],
		recruitation: [],
		exam: [],
		docs: [],
	});

	const routesCategories: { name: string; route: "school" | "student" | "parents" | "recruitation" | "exam" | "docs" }[] = [
		{ name: "Szkoła", route: "school" },
		{ name: "Dla ucznia", route: "student" },
		{ name: "Dla rodziców", route: "parents" },
		{ name: "Rekrutacja", route: "recruitation" },
		{ name: "Matura", route: "exam" },
		{ name: "Dokumenty", route: "docs" },
	];

	const router = useRouter();

	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			if (session) {
				if (session.user.role.managePages) {
					fetchPages();
					fetchRoutes();
					setSession(session);
				} else router.push("/dashboard");
			} else router.push("/");
		}
		initFunction();
	}, [router]);

	async function fetchPages() {
		const returnedPages = await (await fetch(`/api/dashboard/pages`)).json();
		setPages(returnedPages);
	}
	async function fetchRoutes() {
		const returnedRoutes = await (await fetch(`/api/routes`)).json();
		setRoutes(returnedRoutes);
	}

	if (pages && userSession)
		return (
			<div className="dashboard-page">
				<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Linki</h1>

				<div className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 w-full gap-3 md:gap-2 lg:gap-3 xl:gap-4">
					{routesCategories.map((routeCategory) => (
						<div className="border-2 flex flex-col hover:bg-LightGray/40 bg-LightGray/20 transition-all duration-300 py-2.5 px-3.5 lg:p-5 2xl:p-6 3xl:p-8 gap-y-1.5 sm:gap-2 md:gap-3 rounded-2xl">
							<h1 className={`w-full md:text-xl lg:text-2xl xl:text-3xl ${poppingsFont600.className}`}>{routeCategory.name}</h1>

							{routes[routeCategory.route].map((route) => (
								<div className="flex flex-col">
									<p className={`text-sm sm:text-base md:text-lg lg:text-xl ${poppingsFont500.className}`}>{route.name}</p>
									<p className="text-xs sm:text-sm md:text-base lg:text-lg">{route.link}</p>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		);
	else return <LoadingLayout />;
}
