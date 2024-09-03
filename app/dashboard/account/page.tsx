"use client";

import LoadingLayout from "@/app/dashboard/loadingLayout";
import { faCheck, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const [accountData, setAccountData] = useState<UserDataType>();
	const [name, setName] = useState<string>("");

	const router = useRouter();
	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			if (session) fetchAcountData();
			else router.push("/");
		}
		initFunction();
	}, [router]);

	async function fetchAcountData() {
		const returnedData = (await (await fetch(`/api/dashboard/account`)).json()) as UserDataType;
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
				<h1 className={`dashboard-heading poppinsFont700`}>Konto</h1>

				<div className="flex flex-col lg:flex-row gap-y-5 items-center gap-x-7">
					<Image src={accountData.image} className="h-20 w-20 rounded-full" height={96} width={96} alt="Account image" />

					<div className="flex gap-x-5 items-center">
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							className={`border-2 rounded-lg px-5 py-1.5 bg-LightGray/20 outline-none text-sm xs:text-lg sm:text-xl xl:text-2xl poppinsFont700`}
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
						<p className={`text-xs sm:text-sm xl:text-base poppinsFont500`}>Login:</p>
						<p className={`text-base sm:text-lg xl:text-xl poppinsFont700`}>{accountData.login}</p>
					</div>
					<div className="flex flex-col">
						<p className={`text-xs sm:text-sm xl:text-base poppinsFont500`}>Email:</p>
						<p className={`text-base sm:text-lg xl:text-xl poppinsFont700`}>{accountData.email}</p>
					</div>
					<div className="flex flex-col">
						<p className={`text-xs sm:text-sm xl:text-base poppinsFont500`}>Typ użytkownika:</p>
						<p className={`text-base sm:text-lg xl:text-xl poppinsFont700`}>{accountData.role.name}</p>
					</div>
				</div>
				<button onClick={() => signOut({ callbackUrl: "/" })} className={`group/button dashboard-post-tile plusJakartaSansFont700`}>
					Wyloguj się
					<div className="dashboard-post-tile-icon">
						<FontAwesomeIcon icon={faSignOut} />
					</div>
				</button>
			</div>
		);
	else return <LoadingLayout />;
}
