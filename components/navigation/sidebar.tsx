// import { faBell, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import Link from "next/link";
import { faChartLine, faClose, faMagnifyingGlass, faPlus, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});
const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});
const plusJakraSansFont500 = Plus_Jakarta_Sans({
	weight: "500",
	subsets: ["latin"],
});

export default function Sidebar(props: { visible: boolean; toggle: Function }) {
	const [userSession, setSession] = useState<SessionDataType | undefined>();
	const [accountSettings, setAccountSettings] = useState(false);

	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			setSession(session);
		}
		initFunction();
	}, []);


	return (
		<div className={`fixed z-40 top-0 h-screen w-full 2xs:w-96 duration-500 ease-out transition-all right-0 p-2 ${props.visible ? "translate-x-0" : "translate-x-full"}`}>
			<div className="w-full gap-y-5 h-full flex sm:ps-7 sm:pe-8 sm:py-6 ps-6 pe-7 py-5 flex-col bg-MainPurple overflow-y-auto rounded-l-2xl rounded-r-4xl">
				{userSession ? (
					<>
						<div className="flex items-center gap-x-2.5 justify-center sm:gap-x-4 relative">
							<div
								onClick={() => setAccountSettings((old) => !old)}
								className={`flex group grow items-center gap-x-3 sm:gap-x-4 rounded-2xl cursor-pointer hover:bg-MainDarkGray/30 ${
									accountSettings ? "bg-MainDarkGray/30" : ""
								}`}
							>
								<Image
									alt="User icon"
									src={userSession?.user.image}
									className={`border-2 z-50 group-hover:scale-110 duration-300 transition-all group-hover:-rotate-3 border-white/30 w-12 sm:w-14 h-12 sm:h-14 rounded-xl ${
										accountSettings ? "scale-110 -rotate-3" : ""
									}`}
									height={55}
									width={55}
								/>
								<div className="grow flex flex-col h-fit">
									<div className={`text-white text-sm sm:text-lg sm:leading-4 ${poppingsFont700.className}`}>{userSession.user.name}</div>
									<div className={`text-LightGray text-sm sm:text-base ${plusJakraSansFont500.className}`}>{userSession.user.role.name}</div>
								</div>
							</div>

							<div
								className={`flex flex-col absolute w-full border-2 border-MainDarkGray transition-all duration-1000 border-dotted gap-y-1 bg-MainPurple rounded-2xl p-3 top-full left-0 shadow-xl mt-3 ${
									accountSettings ? "" : "hidden"
								}`}
							>
								<Link
									className="sidebar-button"
									href={"/dashboard/account"}
									onClick={() => {
										props.toggle();
										setAccountSettings(false);
									}}
								>
									<FontAwesomeIcon icon={faUser} className="w-6 h-6 text-white py-3 px-[17px]" />
									<div className={`${poppingsFont600.className}`}>ustawienia konta</div>
								</Link>

								<Link
									className="sidebar-button"
									href={"/auth/signout"}
									onClick={() => {
										props.toggle();
										setAccountSettings(false);
									}}
								>
									<FontAwesomeIcon icon={faSignOut} className="w-6 h-6 text-white py-3 px-[17px]" />
									<div className={`${poppingsFont600.className}`}>wyloguj się</div>
								</Link>
							</div>

							<FontAwesomeIcon icon={faMagnifyingGlass} className="w-3 h-3 sm:w-5 sm:h-5 text-MainPurple cursor-pointer bg-white rounded-full p-1 sm:p-2" />
						</div>

						<div className="flex flex-col gap-y-1">
							<Link className={`sidebar-button ${userSession.user.role.createPosts ? "" : "!hidden"} `} href={"/dashboard/post"} onClick={() => props.toggle()}>
								<FontAwesomeIcon icon={faPlus} className="w-6 h-6 text-white py-3 px-[17px]" />
								<div className={`${poppingsFont600.className}`}>dodaj post</div>
							</Link>
							{/* <Link className="sidebar-button" href={""} onClick={() => props.toggle()}>
								<FontAwesomeIcon icon={faCommentDots} className="w-6 h-6 text-white py-3 px-[17px]" />
								<div className={`${poppingsFont600.className}`}>wiadomości</div>
							</Link>
							<Link className="sidebar-button" href={""} onClick={() => props.toggle()}>
								<FontAwesomeIcon icon={faBell} className="w-6 h-6 text-white py-3 px-[17px]" />
								<div className={`${poppingsFont600.className}`}>powiadomienia</div>
							</Link> */}

							<Link className="sidebar-button" href={"/dashboard"} onClick={() => props.toggle()}>
								<FontAwesomeIcon icon={faChartLine} className="w-6 h-6 text-white py-3 px-[17px]" />
								<div className={`${poppingsFont600.className}`}>panel sterowania</div>
							</Link>

							<button className="sidebar-button sm:hidden" onClick={() => props.toggle()}>
								<FontAwesomeIcon icon={faClose} className="w-6 h-6 text-white py-3 px-[17px]" />
								<div className={`${poppingsFont600.className}`}>Zamknij menu</div>
							</button>
						</div>
					</>
				) : (
					<>
						<div className="flex items-center gap-x-4">
							<button onClick={() => signIn()} className="flex grow text-left items-center gap-x-4 hover:bg-MainDarkGray/30 rounded-2xl -ms-3 py-2 px-3">
								<FontAwesomeIcon icon={faUser} className="border-2 bg-white text-MainGreen p-3 aspect-square border-white/30 rounded-xl w-5 h-5" />
								<div className={`text-white grow xs:text-lg leading-5 ${poppingsFont700.className}`}>Zaloguj się</div>
							</button>
							<FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5 text-MainPurple cursor-pointer bg-white rounded-full p-2" />
						</div>

						<div className="flex flex-col gap-y-1 sm:hidden">
							<button className="sidebar-button" onClick={() => props.toggle()}>
								<FontAwesomeIcon icon={faClose} className="w-6 h-6 text-white py-3 px-[17px]" />
								<div className={`${poppingsFont600.className}`}>Zamknij menu</div>
							</button>
						</div>
					</>
				)}

				<div className="h-1 bg-[#9471F3]"></div>
			</div>
		</div>
	);
}
