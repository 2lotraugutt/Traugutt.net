import { faChartLine, faClose, faMagnifyingGlass, faPlus, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NewAnnouncementForm from "../announcements/newAnnouncementForm";
import SearchContainer from "../searchbar/searchContainer";
import SidebarNavigation from "./sidebarNavigation";

export default function Sidebar(props: { visible: boolean; toggle: Function }) {
	const [userSession, setSession] = useState<SessionDataType | undefined>();
	const [accountSettings, setAccountSettings] = useState(false);
	const [announcementForm, setAnnouncementForm] = useState(false);
	const [searchContainer, setSearchContainer] = useState(false);

	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			setSession(session);
		}
		initFunction();
	}, []);

	function toggleForm() {
		if (props.visible) props.toggle();
		setAnnouncementForm((old) => !old);
	}
	function toggleSearchContainer() {
		if (props.visible) props.toggle();
		setSearchContainer((old) => !old);
	}

	return (
		<>
			<div className={`fixed z-40 top-0 h-screen w-full 2xs:w-96 duration-500 ease-out transition-all right-0 p-2 ${props.visible ? "translate-x-0" : "translate-x-full"}`}>
				<div className="w-full gap-y-4 h-full flex sm:ps-7 sm:pe-8 sm:py-6 ps-6 pe-7 py-5 flex-col bg-SecondColor overflow-y-auto rounded-l-2xl rounded-r-4xl">
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
										src={userSession.user.image}
										className={`border-2 z-50 group-hover:scale-110 duration-300 transition-all group-hover:-rotate-3 border-white/30 w-12 sm:w-14 h-12 sm:h-14 rounded-xl ${
											accountSettings ? "scale-110 -rotate-3" : ""
										}`}
										height={55}
										width={55}
									/>
									<div className="grow flex flex-col h-fit">
										<div className={`text-white text-sm sm:text-lg sm:leading-4 poppinsFont700`}>{userSession.user.name}</div>
										<div className={`text-LightGray text-sm sm:text-base plusJakraSansFont500`}>{userSession.user.role.name}</div>
									</div>
								</div>

								{accountSettings && (
									<div
										key={"accountSettings"}
										className={`z-30 flex flex-col absolute w-full border-2 border-MainDarkGray transition-all duration-1000 border-dotted gap-y-1 bg-SecondColor rounded-2xl p-3 top-full left-0 shadow-xl mt-3`}
									>
										<Link
											className="sidebar-button"
											href={"/dashboard/account"}
											onClick={() => {
												props.toggle();
												setAccountSettings(false);
											}}
										>
											<FontAwesomeIcon icon={faUser} className="w-6 h-6 text-white py-3 px-4" />
											<div className={`poppinsFont600`}>ustawienia konta</div>
										</Link>

										<Link
											className="sidebar-button"
											href={"/auth/signout"}
											onClick={() => {
												props.toggle();
												setAccountSettings(false);
											}}
										>
											<FontAwesomeIcon icon={faSignOut} className="w-6 h-6 text-white py-3 px-4" />
											<div className={`poppinsFont600`}>wyloguj się</div>
										</Link>
									</div>
								)}

								<FontAwesomeIcon
									icon={faMagnifyingGlass}
									onClick={() => toggleSearchContainer()}
									className="w-3 h-3 sm:w-5 sm:h-5 text-SecondColor cursor-pointer bg-white rounded-full p-1 sm:p-2"
								/>
							</div>

							<div className="flex flex-col gap-y-1">
								<Link className={`sidebar-button ${!userSession.user.role.createPosts && "!hidden"} `} href={"/dashboard/post"} onClick={() => props.toggle()}>
									<FontAwesomeIcon icon={faPlus} className="w-6 h-6 text-white py-3 px-4" />
									<div className={`poppinsFont600`}>dodaj post</div>
								</Link>
								<button className={`sidebar-button ${!userSession.user.role.addAnnouncements && "!hidden"}`} onClick={() => toggleForm()}>
									<FontAwesomeIcon icon={faPlus} className="w-6 h-6 text-white py-3 px-4" />
									<div className={`poppinsFont600`}>dodaj komunikat</div>
								</button>
								<Link className="sidebar-button" href={"/dashboard"} onClick={() => props.toggle()}>
									<FontAwesomeIcon icon={faChartLine} className="w-6 h-6 text-white py-3 px-4" />
									<div className={`poppinsFont600`}>panel sterowania</div>
								</Link>
								<button className="sidebar-button sm:hidden" onClick={() => props.toggle()}>
									<FontAwesomeIcon icon={faClose} className="w-6 h-6 text-white py-3 px-4" />
									<div className={`poppinsFont600`}>Zamknij menu</div>
								</button>
							</div>
						</>
					) : (
						<>
							<div className="flex items-center gap-x-4">
								<button onClick={() => signIn()} className="flex grow text-left items-center gap-x-4 hover:bg-MainDarkGray/30 rounded-2xl -ms-3 py-2 px-3">
									<FontAwesomeIcon icon={faUser} className="border-2 bg-white text-MainColor p-3 aspect-square border-white/30 rounded-xl w-5 h-5" />
									<div className={`text-white grow xs:text-lg leading-5 poppinsFont700`}>Zaloguj się</div>
								</button>
								<FontAwesomeIcon
									icon={faMagnifyingGlass}
									onClick={() => toggleSearchContainer()}
									className="w-5 h-5 text-SecondColor cursor-pointer bg-white rounded-full p-2"
								/>
							</div>

							<button className="sidebar-button sm:hidden" onClick={() => props.toggle()}>
								<FontAwesomeIcon icon={faClose} className="w-6 h-6 text-white py-3 px-4" />
								<div className={`poppinsFont600`}>Zamknij menu</div>
							</button>
						</>
					)}

					<SidebarNavigation toggle={props.toggle} />
				</div>
			</div>
			{announcementForm && <NewAnnouncementForm toggle={() => toggleForm()} />}

			<AnimatePresence>{searchContainer && <SearchContainer toggle={toggleSearchContainer} />}</AnimatePresence>
		</>
	);
}
