import { faCancel, faL, faQuestion, faRemove, faShield, faSignOut, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { useState } from "react";
import Image from "next/image";

const plusJakartaSansFont700 = Plus_Jakarta_Sans({
	weight: "700",
	subsets: ["latin"],
});

const plusJakartaSansFont500 = Plus_Jakarta_Sans({
	weight: "500",
	subsets: ["latin"],
});

const poppingsFont700 = Poppins({
	weight: "600",
	subsets: ["latin"],
});

export default function UserPostTile(props: { userData: UserDataType; roles: RoleDataType[]; refetchUsers: Function }) {
	const [deleteButtonText, setDeleteButtonText] = useState("Usuń użytkownika");
	const [verifyButtonText, setVerifyButtonText] = useState(props.userData.verified ? "Uczeń spoza szkoły" : "Uczeń ze szkoły");
	const [changeNameButtonText, setChangeNameButtonText] = useState(props.userData.changeName ? "Anuluj prośbe" : "Poproś o zmiane nazwy");
	const [logoutButton, setLogoutButtonText] = useState("Wyloguj");

	async function verifyUser(state: boolean) {
		if (state) setVerifyButtonText("Weryfikowanie...");
		else setVerifyButtonText("Usuwanie roli...");

		await (await fetch(`/api/dashboard/users/user/verify/${props.userData.id}?toggle=${state}`)).json();
		props.refetchUsers();

		if (state) setVerifyButtonText("Uczeń spoza szkoły");
		else setVerifyButtonText("Uczeń ze szkoły");
	}

	async function changeName(state: boolean) {
		if (state) setChangeNameButtonText("Wysyłanie prośby...");
		else setChangeNameButtonText("Anulowanie prośby...");

		await (await fetch(`/api/dashboard/users/user/changeName/${props.userData.id}?toggle=${state}`)).json();
		props.refetchUsers();

		if (state) setChangeNameButtonText("Anuluj prośbe");
		else setChangeNameButtonText("Poproś o zmiane nazwy");
	}

	async function logoutUser() {
		setLogoutButtonText("Wylogowywanie...");

		await (await fetch(`/api/dashboard/users/user/signout/${props.userData.id}`)).json();
		props.refetchUsers();
	}
	async function deleteUser() {
		setDeleteButtonText("Usuwanie...");

		await (await fetch(`/api/dashboard/users/user/delete/${props.userData.id}`)).json();
		props.refetchUsers();
	}
	return (
		<div className="h-fit w-full text-left flex-col 2xl:flex-row 2xl:items-center group border-2 hover:bg-LightGray/40 transition-all duration-300 py-5 md:py-6 md:px-8 px-5 lg:py-8 lg:px-8 3xl:px-12 xl:py-9 flex gap-y-4 md:gap-y-6 lg:gap-y-10 xl:gap-x-10 rounded-2xl">
			<div className="flex xl:max-w-[36rem] 2xl:max-w-[47rem] 3xl:max-w-4xl 4xl:max-w-[72rem] flex-col gap-y-2 xl:gap-y-5 lg:gap-y-3.5 w-full">
				<p className={`text-sm 2xs:text-lg xs:text-lg sm:text-xl md:text-2xl 4xl:text-3xl gap-3 sm:gap-4 md:gap-5 items-center flex ${poppingsFont700.className}`}>
					<Image
						className="aspect-square object-cover rounded-full md:w-16 w-8 h-8 sm:w-12 sm:h-12 md:h-16"
						src={props.userData.image}
						alt="User image"
						width={50}
						height={50}
					/>

					<span className="me-5">{props.userData.name}</span>
				</p>
			</div>

			<div className={`flex flex-col lg:flex-row md:justify-between 2xl:justify-end xl:gap-10 grow gap-y-2 ${plusJakartaSansFont500.className}`}>
				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Email: </p>
					<div className={`dashboardPostTileData ${plusJakartaSansFont700.className}`}>{props.userData.email}</div>
				</div>

				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Typ użytkownika: </p>

					<select
						onChange={async (e) => await fetch(`/api/dashboard/users/user/setRole/${props.userData.id}?role=${e.target.value}`)}
						className={`outline-none bg-LightGray/40 transition-all duration-300 hover:!bg-LightGray group-hover:bg-white !py-1 !px-5 !border-none dashboardPostTileData ${plusJakartaSansFont700.className}`}
					>
						{props.roles.map((role, index) => {
							return (
								<option key={index} value={role.tag as any} selected={role.tag == props.userData.roleTag}>
									{role.name}
								</option>
							);
						})}
					</select>
				</div>

				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Ze szkoły:</p>
					<div className={`dashboardPostTileData flex items-center gap-x-2 ${plusJakartaSansFont700.className}`}>
						<div className={`w-2 h-2 rounded-full ${props.userData.verified == null && "hidden"} ${props.userData.verified ? "bg-MainColor" : "bg-MainRed"}`} />
						{props.userData.verified == null ? "---" : props.userData.verified ? "Tak" : "Nie"}
					</div>
				</div>

				<div className="dashboardPostTileDataRow">
					<p className="h-fit">Wymagana zmiana nazwy:</p>
					<div className={`dashboardPostTileData flex items-center gap-x-2 ${plusJakartaSansFont700.className}`}>
						<div className={`w-2 h-2 rounded-full ${props.userData.changeName ? "bg-MainRed" : "bg-MainColor"}`} />
						{props.userData.changeName ? "Tak" : "Nie"}
					</div>
				</div>
			</div>

			<div className="flex justify-between xl:justify-normal gap-y-2 2xl:gap-y-3 flex-col md:flex-row 3xl:flex-col gap-x-5">
				<button onClick={() => verifyUser(!props.userData.verified)} className={`group/button dashboard-post-tile ${plusJakartaSansFont700.className}`}>
					{verifyButtonText}
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={props.userData.verified ? faRemove : faShield} />
					</div>
				</button>

				<button onClick={() => changeName(!props.userData.changeName)} className={`group/button dashboard-post-tile  ${plusJakartaSansFont700.className}`}>
					{changeNameButtonText}
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={props.userData.changeName ? faCancel : faQuestion} />
					</div>
				</button>
				{/* <button
					onClick={() => changeName(false)}
					className={`group/button dashboard-post-tile ${props.userData.changeName || "!hidden"} ${plusJakartaSansFont700.className}`}
				>
					{unChangeNameButtonText}

					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faCancel} />
					</div>
				</button> */}

				<button onClick={() => logoutUser()} className={`group/button dashboard-post-tile ${plusJakartaSansFont700.className}`}>
					{logoutButton}
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faSignOut} />
					</div>
				</button>

				<button onClick={() => deleteUser()} className={`group/button dashboard-post-tile ${plusJakartaSansFont700.className}`}>
					{deleteButtonText}
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faTrash} />
					</div>
				</button>
			</div>
		</div>
	);
}
