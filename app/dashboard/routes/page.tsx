"use client";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import LoadingLayout from "../loadingLayout";

export default function Page() {
	const [userSession, setSession] = useState<SessionDataType>();
	const [routes, setRoutes] = useState<RouteDataType[]>([]);

	const [newName, setNewName] = useState("");
	const [newLink, setNewLink] = useState("");
	const [category, setCategory] = useState("school");

	const routesCategories: { name: string; route: RouteCategoryDataType }[] = [
		{ name: "Szkoła", route: "school" },
		{ name: "Dla ucznia", route: "student" },
		{ name: "Dla rodziców", route: "parents" },
		{ name: "Rekrutacja", route: "recruitation" },
		{ name: "Matura", route: "exam" },
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

	function onDragEnd(result: any) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}
		editIndex(result.destination.index, result.draggableId);
		fetchRoutes();
	}

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
						className={`w-fit bg-MainColor hover:bg-MainDarkGray disabled:!bg-MainDarkGray transition-all duration-300 ease-out text-xs sm:text-sm md:text-base lg:text-lg px-20 my-5 py-3 text-white rounded-3xl plusJakartaSans800`}
					>
						Dodaj link
					</button>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 w-full gap-3 md:gap-2 lg:gap-3 xl:gap-4">
					{routesCategories.map((routeCategory, i) => {
						const routesForNav = routes?.filter((route) => route.category == routeCategory.route) ?? [];
						return (
							<div
								key={i}
								className="border-2 flex flex-col hover:bg-LightGray/40 bg-LightGray/20 transition-all duration-300 py-2.5 px-3.5 lg:p-5 2xl:p-6 3xl:p-8 gap-y-1.5 sm:gap-2 md:gap-3 rounded-2xl"
							>
								<h1 className={`w-full md:text-xl lg:text-2xl xl:text-3xl poppinsFont600`}>{routeCategory.name}</h1>
								<DragDropContext onDragEnd={onDragEnd}>
									<Droppable droppableId="droppable">
										{(provided) => (
											<div {...provided.droppableProps} ref={provided.innerRef}>
												{routesForNav.map((route, j) => (
													<Draggable key={route.id} draggableId={route.id} index={j}>
														{(provided) => (
															<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex flex-col">
																<div className="flex justify-between">
																	<p className={`text-sm sm:text-base md:text-lg lg:text-xl poppinsFont500`}>{route.name}</p>
																	<FontAwesomeIcon
																		onClick={() => deleteRoutes(route.id)}
																		icon={faTrash}
																		className="h-4 w-4 cursor-pointer text-MainDarkGray hover:text-MainRed transition-all"
																	/>
																</div>
																<Link
																	target="blank"
																	href={route.link[0] == "/" ? "https://traugutt.net" + route.link : route.link}
																	className="text-xs sm:text-sm md:text-base lg:text-lg hover:text-MainColor transition-all"
																>
																	{route.link}
																</Link>
															</div>
														)}
													</Draggable>
												))}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
								</DragDropContext>
							</div>
						);
					})}
				</div>
			</div>
		);
	else return <LoadingLayout />;
}
