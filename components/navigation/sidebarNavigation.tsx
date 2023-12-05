import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faInstagram, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faAngleRight, faClipboardList, faFile, faFileWord, faFileZipper, faGraduationCap, faHouseUser, faPhone, faSchool } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});
const poppingsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});


export default function SidebarNavigation(props: { toggle: Function }) {
	const [openedList, setOpened] = useState<boolean[]>([]);
	const [routes, setRoutes] = useState<RouteDataType[]>();

	function changeState(i: number) {
		let newOpened = [...mainNavs.map((a) => false)];

		newOpened[i] = !openedList[i];
		setOpened(newOpened);
	}

	useEffect(() => {
		fetchRoutes();
		async function fetchRoutes() {
			const fetchedRoutes = await(await fetch("/api/routes")).json();
			console.log(fetchedRoutes);
			setRoutes(fetchedRoutes);
		}
	}, []);

	const mainNavs: { name: string; icon: IconDefinition; routes: string }[] = [
		{
			name: "Szkoła",
			icon: faSchool,
			routes: "school",
		},
		{
			name: "Dla ucznia",
			icon: faGraduationCap,
			routes: "student",
		},
		{
			name: "Dla rodziców",
			icon: faHouseUser,
			routes: "parents",
		},
		{
			name: "Rekrutacja",
			icon: faClipboardList,
			routes: "recruitation",
		},
		{
			name: "Matura",
			icon: faFileWord,
			routes: "exam",
		},
		{
			name: "Dokumenty",
			icon: faFile,
			routes: "docs",
		},
	];

	return (
		<>
			<div className="h-1 bg-DarkColor/40 rounded-lg"></div>

			<div className="flex flex-col gap-y-1">
				{/* <Link href={""} className="sidebar-button">
					<FontAwesomeIcon icon={faShop} className="w-6 h-6 text-white py-3 px-4" />
					<div className={`${poppingsFont600.className}`}>Sklep z odzieżą</div>
				</Link> */}

				<Link href={"http://2lo.traugutt.net"} target="blank" className="sidebar-button">
					<FontAwesomeIcon icon={faFileZipper} className="w-6 h-6 text-white py-3 px-4" />
					<div className={`${poppingsFont600.className}`}>Archiwalna strona</div>
				</Link>

				<div className="flex gap-x-1 justify-between px-1.5 mt-2">
					<Link
						href={"https://www.instagram.com/2lotraugutt/"}
						target="blank"
						className="aspect-square flex transition-all duration-300 items-center hover:bg-MainDarkGray/30 rounded-xl text-white p-2.5"
					>
						<FontAwesomeIcon icon={faInstagram} className="w-6 h-6 text-white aspect-square" />
					</Link>
					<Link
						href={"https://www.facebook.com/trauguttnet"}
						target="blank"
						className="aspect-square flex transition-all duration-300 items-center hover:bg-MainDarkGray/30 rounded-xl text-white p-2.5"
					>
						<FontAwesomeIcon icon={faFacebook} className="w-6 h-6 text-white aspect-square" />
					</Link>
					<Link
						href={"https://www.tiktok.com/@traugutt_czestochowa"}
						target="blank"
						className="aspect-square flex transition-all duration-300 items-center hover:bg-MainDarkGray/30 rounded-xl text-white p-2.5"
					>
						<FontAwesomeIcon icon={faTiktok} className="w-6 h-6 text-white aspect-square" />
					</Link>
					<Link
						href={"https://www.youtube.com/@IILOTraugutt"}
						target="blank"
						className="aspect-square flex transition-all duration-300 items-center hover:bg-MainDarkGray/30 rounded-xl text-white p-2.5"
					>
						<FontAwesomeIcon icon={faYoutube} className="w-6 h-6 text-white aspect-square" />
					</Link>
				</div>
			</div>

			<div className="h-1 bg-DarkColor/40 rounded-lg"></div>

			<motion.div className="flex flex-col gap-y-1">
				{mainNavs.map((nav, i) => {
					const routesForNav = routes?.filter((route) => route.category == nav.routes) ?? [];
					return (
						<>
							<motion.button
								key={i}
								className={`sidebar-button ${openedList[i] && "bg-MainDarkGray/20"} ${poppingsFont600.className}`}
								onClick={() => changeState(i)}
							>
								<FontAwesomeIcon icon={nav.icon} className="w-6 h-6 text-white py-3 px-4" />
								<div>{nav.name}</div>

								{routes && routesForNav.length != 0 && (
									<FontAwesomeIcon
										icon={faAngleRight}
										className={`w-5 h-5 transition-all duration-300 ms-auto text-white px-4 ${openedList[i] && "rotate-90"}`}
									/>
								)}
							</motion.button>

							<AnimatePresence>
								{routes && routesForNav.length != 0 && openedList[i] && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										exit={{ opacity: 0, height: 0 }}
										className="flex mt-1 overflow-hidden"
									>
										<div className="w-1 bg-MainColor mx-4 my-2.5 py-0.5 rounded-full flex flex-col items-center justify-between">
											{[...Array(routesForNav.length)].map((n, i) => (
												<div key={i} className={`w-3.5 h-3.5 rounded-full bg-MainColor`}></div>
											))}
										</div>
										<div className="flex flex-col gap-y-1 grow">
											{routesForNav.map((route, j) => (
												<Link
													key={j}
													onClick={() => props.toggle()}
													className={`sidebar-button px-3 py-1.5 w-full ${poppingsFont500.className}`}
													href={route.link}
												>
													{route.name}
												</Link>
											))}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</>
					);
				})}

				<Link href={"/kontakt"} className="sidebar-button" onClick={() => props.toggle()}>
					<FontAwesomeIcon icon={faPhone} className="w-6 h-6 text-white py-3 px-4" />
					<div className={`${poppingsFont600.className}`}>Kontakt</div>
				</Link>
			</motion.div>
		</>
	);
}
