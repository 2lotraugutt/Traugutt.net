import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight, faClipboardList, faFileWord, faGraduationCap, faHouseUser, faPhone, faSchool, faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});

export default function SidebarNavigation() {
	const [openedList, setOpened] = useState<boolean[]>([]);

	function changeState(i: number) {
		let newOpened = [...mainNavs.map((a) => false)];

		newOpened[i] = !openedList[i];
		setOpened(newOpened);
	}

	const mainNavs: { name: string; icon: IconDefinition }[] = [
		{ name: "Szkoła", icon: faSchool },
		{ name: "Dla ucznia", icon: faGraduationCap },
		{ name: "Dla rodziców", icon: faHouseUser },
		{ name: "Rekrutacja", icon: faClipboardList },
		{ name: "Matura", icon: faFileWord },
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

			<div className="flex flex-col gap-y-1">
				{mainNavs.map((nav, i) => (
					<button className={`sidebar-button ${openedList[i] && "bg-MainDarkGray/20"}`} onClick={() => changeState(i)}>
						<FontAwesomeIcon icon={nav.icon} className="w-6 h-6 text-white py-3 px-4" />
						<div className={`${poppingsFont600.className}`}>{nav.name}</div>

						<FontAwesomeIcon icon={faAngleRight} className={`w-5 h-5 transition-all duration-300 ms-auto text-white px-4 ${openedList[i] && "rotate-90"}`} />
					</button>
				))}

				<Link href={""} className="sidebar-button">
					<FontAwesomeIcon icon={faPhone} className="w-6 h-6 text-white py-3 px-4" />
					<div className={`${poppingsFont600.className}`}>Kontakt</div>
				</Link>
			</div>
		</>
	);
}
