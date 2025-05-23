"use client";

import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingLayout from "../loadingLayout";
import CategoryComponent from "./categoryComponent";

export default function Page() {
	const [userSession, setSession] = useState<SessionDataType>();
	const [routes, setRoutes] = useState<RouteDataType[]>([]);
	const [pages, setPages] = useState<{ file: string; content: string }[]>([]);

	const [newName, setNewName] = useState("");
	const [newLink, setNewLink] = useState("");
	const [category, setCategory] = useState("school");

	const routesCategories: { name: string; route: RouteCategoryDataType }[] = [
		{ name: "Szkoła", route: "school" },
		{ name: "Dla ucznia", route: "student" },
		{ name: "Dla rodziców", route: "parents" },
		{ name: "Rekrutacja", route: "recruitation" },
		{ name: "Matura", route: "exam" },
		{ name: "Gazetka LOT", route: "lot" },
		{ name: "Wyprawy", route: "trips" },
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
					fetchPages();
				} else router.push("/dashboard");
			} else router.push("/");
		}
		initFunction();
	}, [router]);

	async function fetchRoutes() {
		const returnedRoutes = await (await fetch(`/api/routes`)).json();
		setRoutes(returnedRoutes);
	}

	async function addRoutes() {
		const data = new FormData();
		data.set("name", newName);
		data.set("link", newLink);
		data.set("category", category);

		await fetch(`/api/dashboard/routes`, {
			body: data,
			method: "POST",
		});

		setNewLink("");
		setNewName("");

		fetchRoutes();
	}

	async function editIndex(index: number, id: string) {
		const data = new FormData();
		data.set("index", index.toString());

		await fetch(`/api/dashboard/routes/${id}`, {
			body: data,
			method: "PUT",
		});

		fetchRoutes();
	}

	async function deleteRoutes(id: string) {
		await fetch(`/api/dashboard/routes/${id}`, {
			method: "DELETE",
		});
		fetchRoutes();
	}

	async function fetchPages() {
		const returnedPages = await (
			await fetch(`/api/dashboard/pages`, {
				cache: "no-store",
			})
		).json();
		setPages(returnedPages);
	}
	const filteredSuggestions = pages.filter((page) => page.file.toLowerCase().includes(newLink.toLowerCase())).slice(0, 5);
	if (routes && userSession)
		return (
			<div className="dashboard-page">
				<h1 className={`dashboard-heading poppinsFont700`}>Linki</h1>

				<div className="flex flex-col items-center h-fit w-full text-left border-2 hover:bg-LightGray/40 bg-LightGray/20 transition-all duration-300 py-4 md:py-5 md:px-7 px-4 lg:py-7 lg:px-7 3xl:px-10 xl:py-8 gap-y-1.5 sm:gap-2 md:gap-3 rounded-2xl">
					<h1 className={`w-full sm:text-xl md:text-2xl poppinsFont700`}>Dodaj nowy link</h1>
					<input
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
						type="text"
						placeholder="Podaj tytuł (będzie widoczny w menu bocznym)"
						className="bg-white rounded-lg p-2 outline-none w-full text-xs sm:text-sm md:text-base"
					/>
					<input
						value={newLink}
						onChange={(e) => setNewLink(e.target.value)}
						type="text"
						placeholder="Podaj link lub nazwę strony (/page/nazwa-pliku)"
						className="bg-white rounded-lg p-2 outline-none w-full text-xs sm:text-sm md:text-base"
					/>
					{newLink.length > 0 && filteredSuggestions.length > 0 && (
						<ul className="bg-white border rounded-lg w-full p-2 text-xs sm:text-sm md:text-base">
							{filteredSuggestions.map((page, index) => (
								<li key={index} onClick={() => setNewLink("/page/" + page.file.slice(0, -4))} className="px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer">
									/page/{page.file.slice(0, -4)}
								</li>
							))}
						</ul>
					)}
					<select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-white rounded-lg p-2 outline-none w-full text-xs sm:text-sm md:text-base">
						{routesCategories.map((routeCategory, i) => (
							<option key={i} value={routeCategory.route}>
								{routeCategory.name}
							</option>
						))}
					</select>

					<button
						onClick={() => addRoutes()}
						disabled={newName.trim() == "" || newLink.trim() == "" || category == ""}
						className={`w-fit bg-MainColor hover:bg-MainDarkGray disabled:!bg-MainDarkGray transition-all duration-300 ease-out text-xs sm:text-sm md:text-base lg:text-lg px-20 my-5 py-3 text-white rounded-3xl plusJakartaSans800`}
					>
						Dodaj link
					</button>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 w-full gap-3 md:gap-2 lg:gap-3 xl:gap-4">
					{routesCategories.map((routeCategory, i) => {
						const routesForNav = routes?.filter((route) => route.category == routeCategory.route) ?? [];
						return (
							<CategoryComponent
								deleteRoutes={deleteRoutes}
								fetchRoutes={fetchRoutes}
								routeCategory={routeCategory}
								editIndex={editIndex}
								routesForNav={routesForNav}
								key={i}
							></CategoryComponent>
						);
					})}
				</div>
			</div>
		);
	else return <LoadingLayout />;
}
