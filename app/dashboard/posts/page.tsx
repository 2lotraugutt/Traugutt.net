"use client";

import { getSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardPostTile from "./dashboardPostTile";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function Page() {
	const [userSession, setSession] = useState<any>();
	const [posts, setPosts] = useState<PostDataTypeWithAuthor[]>();
	const router = useRouter();

	useEffect(() => {
		async function name() {
			const session = (await getSession()) as SessionDataType;

			if (session) {
				if (session.user.role == "USER") router.push("/dashboard");
				else setSession(session);

				if (session.user.role == "ADMIN" || session.user.role == "EDITOR" || session.user.role == "TEACHER") {
					const returnedPosts = await (await fetch(`/api/posts-dashboard?count=50`)).json();
					setPosts(returnedPosts);
				} else {
					const returnedPosts = await (await fetch(`/api/posts-dashboard?user=${session.user.id}`)).json();
					setPosts(returnedPosts);
				}
			} else router.push("/");
		}
		name();
	}, []);

	if (posts)
		return (
			<div className="flex flex-col gap-y-10 sm:gap-y-12 py-20 3xl:gap-y-24 lg:gap-y-16 2xl:gap-y-20 md:gap-y-14 lg:px-12 px-2 md:px-5 4xl:px-0 bg-LightGray/30 border-y-2 border-LightGray/70">
				<h1 className={`text-MainDarkGray text-center text-6xl ${poppingsFont700.className}`}>Posty</h1>

				<div className="flex w-full flex-col gap-y-3 md:gap-2 lg:gap-3 xl:gap-4 4xl:gap-6">
					{posts.map((postData: PostDataTypeWithAuthor) => (
						<DashboardPostTile postData={postData} key={postData.id} />
					))}
				</div>
			</div>
		);
	else
		return (
			<div className="flex flex-col gap-y-10 sm:gap-y-12 py-20 3xl:gap-y-24 lg:gap-y-16 2xl:gap-y-20 md:gap-y-14 lg:px-12 px-2 md:px-5 4xl:px-0 bg-LightGray/30 border-y-2 border-LightGray/70">
				<h1 className={`text-MainDarkGray text-center text-6xl h-screen ${poppingsFont700.className}`}>Ładowanie...</h1>
			</div>
		);
}
