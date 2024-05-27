import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
	faAddressBook,
	faAngleRight,
	faBullhorn,
	faCalendar,
	faGift,
	faLink,
	faList,
	faListCheck,
	faNewspaper,
	faPager,
	faPeopleGroup,
	faPlus,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default async function Page() {
	const session = (await getServerSession(authOptions)) as SessionDataType;
	const tiles: {
		name: string;
		link: string;
		icon: IconDefinition;
		perm: string[];
	}[] = [
		{ name: "Dodaj nowy post", link: "/dashboard/post", icon: faPlus, perm: ["createPosts"] },
		{ name: "Twoje posty", link: "/dashboard/personal-posts", icon: faAddressBook, perm: ["createPosts"] },
		{ name: "Posty", link: "/dashboard/posts", icon: faList, perm: ["managePosts", "publishPosts"] },
		{ name: "Komunikaty", link: "/dashboard/announcements", icon: faBullhorn, perm: ["manageAnnouncements"] },
		{ name: "Informacje", link: "/dashboard/notifications", icon: faNewspaper, perm: ["manageNotifications"] },
		{ name: "Kalendarz", link: "/dashboard/calendar", icon: faCalendar, perm: ["manageCalendar", "manageEvents"] },
		{ name: "Szczęśliwe numerki", link: "/dashboard/numbers", icon: faGift, perm: ["manageCalendar", "manageNumbers"] },
		{ name: "Użytkownicy", link: "/dashboard/users", icon: faPeopleGroup, perm: ["manageUsers"] },
		{ name: "Weryfikacja użytkowników", link: "/dashboard#weryfikuj", icon: faListCheck, perm: ["manageUsers"] },
		{ name: "Podstrony", link: "/dashboard/pages", icon: faPager, perm: ["managePages"] },
		{ name: "Linki", link: "/dashboard/routes", icon: faLink, perm: ["managePages"] },
		{ name: "Twoje konto", link: "/dashboard/account", icon: faUser, perm: [""] },
	];

	function returnVisibility(perms: string[]) {
		for (let perm of perms) {
			if (perm == "") {
				return true;
			} else if (
				session.user.role[
					perm as "createPosts" | "publishPosts" | "managePosts" | "manageUsers" | "manageEvents" | "manageCalendar" | "manageRoles" | "manageNotifications"
				]
			) {
				return true;
			}
		}
		return false;
	}

	return (
		<div className="dashboard-page">
			<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Panel sterowania</h1>

			<div className="grid grid-cols-1 2xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-7">
				{tiles.map(
					(tile, i) =>
						returnVisibility(tile.perm) && (
							<Link
								href={tile.link}
								key={i}
								className="bg-MediumGray/60 p-7 text-MainDarkGray group hover:text-white rounded-lg xs:pb-10 sm:pb-14 md:pb-20 hover:scale-105 transition-all duration-300 hover:bg-SecondColor/60"
							>
								<div className="items-center flex gap-x-5">
									<FontAwesomeIcon icon={tile.icon} className={`h-5 lg:h-7`} />
									<p className={`text-xs xs:text-sm sm:text-base md:text-xl 4xl:text-2xl ${poppingsFont700.className}`}>{tile.name}</p>
									<FontAwesomeIcon
										icon={faAngleRight}
										className={`h-3 text-MainDarkGray transition-all duration-300 group-hover:translate-x-3/4 lg:h-5 group-hover: ms-auto`}
									/>
								</div>
							</Link>
						)
				)}
			</div>
		</div>
	);
}
