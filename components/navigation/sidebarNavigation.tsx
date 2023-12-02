import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight, faClipboardList, faFileWord, faGraduationCap, faHouseUser, faPersonChalkboard, faPhone, faSchool, faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});
const poppingsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});

export default function SidebarNavigation() {
	const [openedList, setOpened] = useState<boolean[]>([]);

	function changeState(i: number) {
		let newOpened = [...mainNavs.map((a) => false)];

		newOpened[i] = !openedList[i];
		setOpened(newOpened);
	}

	const mainNavs: { name: string; icon: IconDefinition; pages: { link: string; name: string }[] }[] = [
		{ name: "Szkoła", icon: faSchool, pages: [] },
		{ name: "Dla ucznia", icon: faGraduationCap, pages: [] },
		{
			name: "Dla rodziców",
			icon: faHouseUser,
			pages: [
				{ link: "/page/wywiadowki", name: "Wywiadówki" },
				{ link: "/uonetplus_Pierwsze-logowanie.pdf", name: "Dziennik elektroniczny" },
				{ link: "https://www.kbpn.gov.pl/portal", name: "KBDSPN" },
				{ link: "/page/konsultacje", name: "Harmonogram konsultacji" },
			],
		},
		{ name: "Rekrutacja", icon: faClipboardList, pages: [] },
		{
			name: "Matura",
			icon: faFileWord,
			pages: [
				{ link: "/page/wyniki-matur", name: "Wyniki matur" },
				{ link: "/page/matura-miedzynarodowa", name: "Matura międzynarodowa" },
				{ link: "https://cke.gov.pl/images/_KOMUNIKATY/20200820%20E8%20EM%20Komunikat%20o%20harmonogramie.pdf", name: "Harmonogram matury 2021" },
				{ link: "https://cke.gov.pl/egzamin-maturalny/egzamin-w-nowej-formule/arkusze/", name: "Arkusze maturalne" },
				{ link: "https://cke.gov.pl/images/_KOMUNIKATY/20200820%20EM%20Komunikat%20o%20dostosowaniach.pdf", name: "Dostosowania 2021" },
				{ link: "/page/bibliografia", name: "Bibliografia" },
				{ link: "https://cke.gov.pl/egzamin-maturalny/egzamin-w-nowej-formule/informatory/", name: "Informatory" },
				{ link: "/page/autoprezentacja", name: "Autoprezentacja" },
			],
		},
	];

	return (
		<>
			<div className="h-1 bg-DarkColor/30 rounded-lg"></div>

			<div className="flex flex-col gap-y-1">
				<Link href={""} className="sidebar-button">
					<FontAwesomeIcon icon={faShop} className="w-6 h-6 text-white py-3 px-4" />
					<div className={`${poppingsFont600.className}`}>Sklep z odzieżą</div>
				</Link>
			</div>

			<div className="h-1 bg-DarkColor/30 rounded-lg"></div>

			<motion.div className="flex flex-col gap-y-1">
				{mainNavs.map((nav, i) => (
					<>
						<motion.button
							key={i}
							className={`sidebar-button ${openedList[i] && "bg-MainDarkGray/20"} ${poppingsFont600.className}`}
							onClick={() => changeState(i)}
						>
							<FontAwesomeIcon icon={nav.icon} className="w-6 h-6 text-white py-3 px-4" />
							<div>{nav.name}</div>

							<FontAwesomeIcon icon={faAngleRight} className={`w-5 h-5 transition-all duration-300 ms-auto text-white px-4 ${openedList[i] && "rotate-90"}`} />
						</motion.button>

						<AnimatePresence>
							{nav.pages.length != 0 && openedList[i] && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
									className="flex mt-1"
								>
									<div className="w-1 bg-MainColor mx-3 my-1 rounded-full"></div>
									<div className="flex flex-col gap-y-1 grow">
										{nav.pages.map((page, j) => (
											<Link key={j} className={`sidebar-button px-3 py-1.5 w-full ${poppingsFont500.className}`} href={page.link}>
												{page.name}
											</Link>
										))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</>
				))}

				<Link href={""} className="sidebar-button">
					<FontAwesomeIcon icon={faPhone} className="w-6 h-6 text-white py-3 px-4" />
					<div className={`${poppingsFont600.className}`}>Kontakt</div>
				</Link>
			</motion.div>
		</>
	);
}
