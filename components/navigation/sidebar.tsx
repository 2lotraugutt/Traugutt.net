import { faBell, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { faMagnifyingGlass, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});
const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});
export default function Sidebar(props: { visible: boolean; toggle: Function }) {
	const [userSession, setSession] = useState<SessionDataType | undefined>();

	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			setSession(session);
		}
		initFunction();
	}, []);

	return (
		<div className={`fixed z-40 top-0 h-screen w-full 2xs:w-96 duration-500 ease-out transition-all right-0 p-2 ${props.visible ? "translate-x-0" : "translate-x-full"}`}>
			<div className="w-full gap-y-6 h-full flex ps-7 pe-8 py-8 flex-col bg-MainPurple overflow-y-auto rounded-l-2xl rounded-r-4xl">
				{/* <button onClick={() => props.toggle()}>
					<FontAwesomeIcon icon={faClose} className="w-10 h-10 text-white" />
				</button> */}

				{userSession ? (
					<>
						<div className="flex items-center gap-x-4">
							<Link href={"dashboard/account"} className="flex grow items-center gap-x-4 hover:bg-MainDarkGray/30 rounded-2xl -ms-3 py-2 px-3">
								<Image alt="User icon" src={userSession?.user.image} className="border-2 border-white/30 rounded-xl" height={55} width={55} />
								<div className={`text-white grow text-lg leading-5 ${poppingsFont700.className}`}>{userSession.user.name}</div>
							</Link>

							<FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4 text-MainPurple bg-white rounded-full p-2" />
						</div>

						<div className="flex flex-col gap-y-1">
							<Link className="flex items-center gap-x-4 hover:bg-MainDarkGray/30 rounded-xl" href={"/dashboard/post"}>
								<FontAwesomeIcon icon={faPlus} className="w-6 h-6 text-white py-3 px-[17px]" />
								<div className={`text-white grow text-lg leading-5 ${poppingsFont600.className}`}>dodaj post</div>
							</Link>
							<Link className="flex items-center gap-x-4 hover:bg-MainDarkGray/30 rounded-xl" href={""}>
								<FontAwesomeIcon icon={faCommentDots} className="w-6 h-6 text-white py-3 px-[17px]" />
								<div className={`text-white grow text-lg leading-5 ${poppingsFont600.className}`}>wiadomości</div>
							</Link>
							<Link className="flex items-center gap-x-4 hover:bg-MainDarkGray/30 rounded-xl" href={""}>
								<FontAwesomeIcon icon={faBell} className="w-6 h-6 text-white py-3 px-[17px]" />
								<div className={`text-white grow text-lg leading-5 ${poppingsFont600.className}`}>powiadomienia</div>
							</Link>
						</div>
					</>
				) : (
					<div className="flex items-center gap-x-4">
						<button onClick={() => signIn()} className="flex grow items-center gap-x-4 hover:bg-MainDarkGray/30 rounded-2xl -ms-3 py-2 px-3">
							<FontAwesomeIcon icon={faUser} className="border-2 bg-white text-MainGreen p-3 aspect-square border-white/30 rounded-xl w-5 h-5" />
							<div className={`text-white grow text-lg leading-5 ${poppingsFont700.className}`}>Zaloguj się</div>
						</button>
						<FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4 text-MainPurple bg-white rounded-full p-2" />
					</div>
				)}

				<div className="h-1 bg-[#9471F3]"></div>
			</div>
		</div>
	);
}
