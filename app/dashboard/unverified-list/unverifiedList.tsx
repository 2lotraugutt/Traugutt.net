"use client";

import { getSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UnverifiedUserPostTile from "./unverifiedUserTile";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function UnverifiedList() {
	const [userSession, setSession] = useState<SessionDataType>();
	const [users, setUsers] = useState<UserDataType[]>([]);
	const [usersCount, setUsersCount] = useState<number>(1);

	const router = useRouter();
	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			if (session) {
				if (session.user.role.manageUsers || session.user.role.verifyUsers) {
					fetchUsers();
					setSession(session);
				} else router.push("/dashboard");
			} else router.push("/");
		}
		initFunction();
	}, [router]);

	async function fetchUsers() {
		const returnedUsers = await (await fetch(`/api/dashboard/users/unverified?count=${usersCount * 10}`)).json();

		setUsers(returnedUsers);
		setUsersCount((oldCount) => oldCount + 1);
	}

	async function refetchUsers() {
		const returnedUsers = await (await fetch(`/api/dashboard/users/unverified?count=${usersCount * 10}`)).json();
		setUsers(returnedUsers);
	}

	if (users && userSession && users.length != 0)
		return (
			<>
				<h1 id="weryfikuj" className={`dashboard-heading ${poppingsFont700.className}`}>
					Weryfikacja użytkowników
				</h1>

				<div className="flex w-full flex-col gap-y-3 md:gap-2 lg:gap-3 xl:gap-4 4xl:gap-6">
					{users.map((userData: UserDataType) => (
						<UnverifiedUserPostTile userData={userData} key={userData.id} refetchUsers={() => refetchUsers()} />
					))}

					<button
						onClick={() => fetchUsers()}
						className={`text-center h-fit w-full border-2 text-xl hover:bg-LightGray/20 transition-all duration-300 p-4 px-8 rounded-2xl ${
							poppingsFont700.className
						} ${(usersCount - 1) * 30 > users.length ? "hidden" : ""}`}
					>
						Załaduj więcej
					</button>
				</div>
			</>
		);
}
