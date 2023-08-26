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
			const session = (await getSession()) as SessionDataType;

			if (session) {
				if (session.user.role == "USER") router.push("/dashboard");
				else {
					fetchPosts(session);
					setSession(session);
				}
			} else router.push("/");
		}
		initFunction();
	}, []);

	async function fetchPosts(session: SessionDataType) {
		const returnedPosts = await(await fetch(`/api/postsDashboard?user=${session.user.id}&count=${postsCount * 30}`)).json();
		setPosts(returnedPosts);

		setPostsCount((oldCount) => oldCount + 1);
	}

	if (posts && userSession)
		return (
			<div className="flex flex-col gap-y-10 sm:gap-y-12 py-40 3xl:gap-y-24 lg:gap-y-16 2xl:gap-y-20 md:gap-y-14 lg:px-12 px-2 md:px-5 4xl:px-0 bg-LightGray/30 border-y-2 border-LightGray/70">
				<h1 className={`text-MainDarkGray text-center text-6xl ${poppingsFont700.className}`}>Twoje posty</h1>

				<Link
					href={"dashboard/post"}
					className={`text-center h-fit w-full border-2 text-xl hover:bg-LightGreen/20 border-dotted border-MainGreen transition-all duration-300 py-6 rounded-2xl ${poppingsFont700.className}`}
				>
					Dodaj nowy post
				</Link>

				{posts.length != 0 ? (
					<div className="flex w-full flex-col gap-y-3 md:gap-2 lg:gap-3 xl:gap-4 4xl:gap-6">
						{posts.map((postData: PostDataTypeWithAuthor) => (
							<DashboardPostTile postData={postData} key={postData.id} />
						))}
						<button
							onClick={() => fetchPosts(userSession)}
							className={`text-center h-fit w-full border-2 text-xl hover:bg-LightGray/20 transition-all duration-300 p-4 px-8 rounded-2xl ${poppingsFont700.className}`}
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
