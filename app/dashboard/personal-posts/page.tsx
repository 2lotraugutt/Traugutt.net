"use client";

import { getSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardPostTile from "@/components/dashboard/dashboardPostTile";
import Link from "next/link";
import LoadingLayout from "@/components/dashboard/loadingLayout";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function Page() {
	const [userSession, setSession] = useState<SessionDataType>();
	const [posts, setPosts] = useState<PostDataTypeWithAuthor[]>();
	const [postsCount, setPostsCount] = useState<number>(1);
	const router = useRouter();

	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			if (session) {
				if (!session.user.role.createPosts) router.push("/dashboard");
				else {
					fetchPosts(session);
					setSession(session);
				}
			} else router.push("/");
		}
		initFunction();
	}, []);

	async function fetchPosts(session: SessionDataType) {
		const returnedPosts = await(await fetch(`/api/dashboard/posts?user=${session.user.id}&count=${postsCount * 30}`)).json();
		setPosts(returnedPosts);

		setPostsCount((oldCount) => oldCount + 1);
	}

	if (posts && userSession)
		return (
			<div className="dashboard-page">
				<h1 className={`dashboard-heading ${poppingsFont700.className}`}>Twoje posty</h1>

				{posts.length != 0 ? (
					<div className="flex w-full flex-col gap-y-3 md:gap-2 lg:gap-3 xl:gap-4 4xl:gap-6">
						{posts.map((postData: PostDataTypeWithAuthor) => (
							<DashboardPostTile postData={postData} key={postData.id} />
						))}
						<button
							onClick={() => fetchPosts(userSession)}
							className={`text-MainDarkGray border-MainDarkGray border-2 text-xs xs:text-sm md:text-base xl:text-lg px-8 py-1.5 2xl:text-lg 3xl:text-xl 3xl:py-2 3xl:px-12 rounded-3xl hover:bg-MainDarkGray hover:text-white w-fit mx-auto transition-all duration-200 ease-out ${poppingsFont700.className}`}
						>
							Załaduj więcej
						</button>
					</div>
				) : (
					<></>
				)}
			</div>
		);
	else
		return <LoadingLayout />;
}
