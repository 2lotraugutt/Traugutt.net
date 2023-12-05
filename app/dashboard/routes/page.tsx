"use client";

import { getSession } from "next-auth/react";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingLayout from "../loadingLayout";
import Link from "next/link";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
const plusJakartaSans800 = Plus_Jakarta_Sans({
	weight: "800",
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
	const [routes, setRoutes] = useState<RoutesType>({
		school: [],
		student: [],
		parents: [],
		recruitation: [],
		exam: [],
		docs: [],
	});

	const [newName, setNewName] = useState("");
	const [newLink, setNewLink] = useState("");
	const [category, setCategory] = useState("");

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
					fetchRoutes();
					setSession(session);
				} else router.push("/dashboard");
			} else router.push("/");
		}
		initFunction();
	}, [router]);

	async function fetchRoutes() {
		const returnedRoutes = await(
			await fetch(`/api/routes`, {
				cache: "no-store",
			})
		).json();
		setRoutes(returnedRoutes);
	}

	async function addRoutes() {
		const newRoute = { link: newLink, name: newName };
		var newRoutes = routes;

		newRoutes[category as "school" | "student" | "parents" | "recruitation" | "exam" | "docs"].push(newRoute);

		const data = new FormData();
		data.set("content", JSON.stringify(newRoutes));

		await fetch(`/api/dashboard/routes`, {
			body: data,
			method: "POST",
		});

		fetchRoutes();
		setCategory("");
		setNewLink("");
		setNewName("");
	}

	async function deleteRoutes(route: { link: string; name: string }, category: string) {
		var newRoutes = routes;

		const index = newRoutes[category as "school" | "student" | "parents" | "recruitation" | "exam" | "docs"].findIndex(
			(searchRoute) => searchRoute.link == route.link && searchRoute.name == route.name
		);

		newRoutes[category as "school" | "student" | "parents" | "recruitation" | "exam" | "docs"].splice(index, 1);

		const data = new FormData();
		data.set("content", JSON.stringify(newRoutes));

		await fetch(`/api/dashboard/routes`, {
			body: data,
			method: "POST",
		});

		fetchRoutes();
	}

	if (routes && userSession)
		return (
			<div className="dashboard-page">
				<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Linki</h1>

				<div className="flex flex-col items-center h-fit w-full text-left border-2 hover:bg-LightGray/40 bg-LightGray/20 transition-all duration-300 py-4 md:py-5 md:px-7 px-4 lg:py-7 lg:px-7 3xl:px-10 xl:py-8 gap-y-1.5 sm:gap-2 md:gap-3 rounded-2xl">
					<h1 className={`w-full sm:text-xl md:text-2xl ${poppingsFont700.className}`}>Dodaj nowy link</h1>
					<input
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
						type="text"
						placeholder="Podaj nazwę"
						className="bg-white rounded-lg p-2 outline-none w-full text-xs sm:text-sm md:text-base"
					/>
					<input
						value={newLink}
						onChange={(e) => setNewLink(e.target.value)}
						type="text"
						placeholder="Podaj link lub '/page/nazwa-pliku'"
						className="bg-white rounded-lg p-2 outline-none w-full text-xs sm:text-sm md:text-base"
					/>
					<select
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className="bg-white rounded-lg p-2 outline-none w-full text-xs sm:text-sm md:text-base"
					>
						{routesCategories.map((routeCategory, i) => (
							<option key={i} value={routeCategory.route}>
								{routeCategory.name}
							</option>
						))}
					</select>

					<button
						onClick={() => addRoutes()}
						disabled={newName.trim() == "" || newLink.trim() == "" || category == ""}
						className={`w-fit bg-MainColor hover:bg-MainDarkGray disabled:!bg-MainDarkGray transition-all duration-300 ease-out text-xs sm:text-sm md:text-base lg:text-lg px-20 my-5 py-3 text-white rounded-3xl ${plusJakartaSans800.className}`}
					>
						Dodaj link
					</button>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 w-full gap-3 md:gap-2 lg:gap-3 xl:gap-4">
					{routesCategories.map((routeCategory, i) => (
						<div
							key={i}
							className="border-2 flex flex-col hover:bg-LightGray/40 bg-LightGray/20 transition-all duration-300 py-2.5 px-3.5 lg:p-5 2xl:p-6 3xl:p-8 gap-y-1.5 sm:gap-2 md:gap-3 rounded-2xl"
						>
							<h1 className={`w-full md:text-xl lg:text-2xl xl:text-3xl ${poppingsFont600.className}`}>{routeCategory.name}</h1>

							{routes[routeCategory.route].map((route, j) => (
								<div key={j} className="flex flex-col">
									<div className="flex justify-between">
										<p className={`text-sm sm:text-base md:text-lg lg:text-xl ${poppingsFont500.className}`}>{route.name}</p>
										<FontAwesomeIcon
											onClick={() => deleteRoutes(route, routeCategory.route)}
											icon={faTrash}
											className="h-4 w-4 cursor-pointer text-MainDarkGray hover:text-MainRed transition-all"
										/>
									</div>
									<Link
										target="blank"
										href={route.link[0] == "/" ? "https://traugutt.eu" + route.link : route.link}
										className="text-xs sm:text-sm md:text-base lg:text-lg hover:text-MainColor transition-all"
									>
										{route.link}
									</Link>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		);
	else return <LoadingLayout />;
}
