"use client";

import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingLayout from "@/app/dashboard/loadingLayout";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";

const plusJakartaSansFont700 = Plus_Jakarta_Sans({
	weight: "700",
	subsets: ["latin"],
});

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});
const poppingsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});

export default function Page() {
	const [accountData, setAccountData] = useState<UserDataTypeWithRole>();
	const [name, setName] = useState<string>("");

	const router = useRouter();

	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			if (session) fetchAcountData();
			else router.push("/");
		}
		initFunction();
	}, []);

	async function fetchAcountData() {
		const returnedData = (await (await fetch(`/api/dashboard/account`)).json()) as UserDataTypeWithRole;
		setName(returnedData.name);
		setAccountData(returnedData);
	}

	async function editAcountData() {
		const data = new FormData();

		data.set("name", name);

		setAccountData(undefined);

		await (
			await fetch(`/api/dashboard/account`, {
				body: data,
				method: "POST",
			})
		).json();

		fetchAcountData();
	}

	if (accountData)
		return (
			<div className="dashboard-page  max-w-3xl lg:max-w-5xl mx-auto">
				<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Konto</h1>

				<div className="flex flex-col lg:flex-row gap-y-5 items-center gap-x-7">
					<Image src={accountData.image} className="h-20 w-20 rounded-full" height={96} width={96} alt="Account image" />

					<div className="flex gap-x-5 items-center">
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							className={`border-2 rounded-lg px-5 py-1.5 bg-LightGray/20 outline-none text-sm xs:text-lg sm:text-xl xl:text-2xl ${poppingsFont700.className}`}
						/>

						<FontAwesomeIcon
							icon={faCheck}
							className={`text-MainDarkGray/80 h-5 lg:h-7 duration-200 opacity-100 hover:text-MainColor transition-all ${
								name == accountData.name && "!opacity-0"
							}`}
							onClick={() => editAcountData()}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-y-6 sm:gap-y-8 lg:gap-y-10">
					<div className="flex flex-col">
						<p className={`text-xs sm:text-sm xl:text-base ${poppingsFont500.className}`}>Zweryfikowany:</p>
						<p className={`text-base sm:text-lg xl:text-xl ${poppingsFont700.className}`}>{accountData.verified ? "Tak" : "Nie"}</p>
					</div>
					<div className="flex flex-col">
						<p className={`text-xs sm:text-sm xl:text-base ${poppingsFont500.className}`}>Email:</p>
						<p className={`text-base sm:text-lg xl:text-xl ${poppingsFont700.className}`}>{accountData.email}</p>
					</div>
					<div className="flex flex-col">
						<p className={`text-xs sm:text-sm xl:text-base ${poppingsFont500.className}`}>Typ użytkownika:</p>
						<p className={`text-base sm:text-lg xl:text-xl ${poppingsFont700.className}`}>{accountData.role.name}</p>
					</div>
				</div>
				<button onClick={() => signOut({ callbackUrl: "/" })} className={`group/button dashboard-post-tile ${plusJakartaSansFont700.className}`}>
					Wyloguj się
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faSignOut} />
					</div>
				</button>
			</div>
		);
	else return <LoadingLayout />;
}
