"use client";

import { getSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserPostTile from "@/app/dashboard/users/userTile";
import LoadingLayout from "@/app/dashboard/loadingLayout";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function Page() {
	const [userSession, setSession] = useState<SessionDataType>();
	const [users, setUsers] = useState<UserDataTypeWithRole[]>([]);
	const [roles, setRoles] = useState<RoleDataType[]>([]);
	const [usersCount, setUsersCount] = useState<number>(1);
	const router = useRouter();

	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			if (session) {
				if (session.user.role.manageUsers) {
					fetchUsers();
					fetchRoles();
					setSession(session);
				} else router.push("/dashboard");
			} else router.push("/");
		}
		initFunction();
	}, []);

	async function fetchUsers() {
		const returnedUsers = await(await fetch(`/api/dashboard/users?count=${usersCount * 30}`)).json();
		setUsers(returnedUsers);

		setUsersCount((oldCount) => oldCount + 1);
	}

	async function fetchRoles() {
		const returnedRoles = await (await fetch(`/api/dashboard/roles`)).json();
		setRoles(returnedRoles);
	}

	async function refetchUsers() {
		const returnedUsers = await (await fetch(`/api/dashboard/users?count=${usersCount * 30}`)).json();
		setUsers(returnedUsers);
	}

	if (users && userSession && roles)
		return (
			<div className="dashboard-page">
				<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Użytkownicy</h1>

				<div className="flex w-full flex-col gap-y-3 md:gap-2 lg:gap-3 xl:gap-4 4xl:gap-6">
					{users.map((userData: UserDataTypeWithRole) => (
						<UserPostTile userData={userData} roles={roles} key={userData.id} refetchUsers={() => refetchUsers()} />
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
			</div>
		);
	else return <LoadingLayout />;
}
