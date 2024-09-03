"use client";

import LoadingLayout from "@/app/dashboard/loadingLayout";
import AdminDashboardPostTile from "@/app/dashboard/posts/adminPostTile";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const [userSession, setSession] = useState<SessionDataType>();
	const [posts, setPosts] = useState<PostDataType[]>();
	const [postsCount, setPostsCount] = useState<number>(1);

	const router = useRouter();
	useEffect(() => {
		async function initFunction() {
			const session = (await getSession()) as SessionDataType | undefined;

			if (session) {
				if (session.user.role.managePosts) {
					fetchPosts();
					setSession(session);
				} else router.push("/dashboard");
			} else router.push("/");
		}
		initFunction();
	}, [router]);

	async function fetchPosts() {
		const returnedPosts = await (await fetch(`/api/dashboard/posts?count=${postsCount * 30}`)).json();
		setPosts(returnedPosts);

		setPostsCount((oldCount) => oldCount + 1);
	}

	async function refetchPosts() {
		const returnedPosts = await (await fetch(`/api/dashboard/posts?count=${postsCount * 30}`)).json();
		setPosts(returnedPosts);
	}

	if (posts && userSession)
		return (
			<div className="dashboard-page">
				<h1 className={`dashboard-heading poppinsFont700`}>Posty</h1>

				<div className="flex w-full flex-col gap-y-3 md:gap-2 lg:gap-3 xl:gap-4 4xl:gap-6">
					{posts.map((postData: PostDataType) => (
						<AdminDashboardPostTile postData={postData} key={postData.id} refetchPosts={refetchPosts} />
					))}
					<button
						onClick={() => fetchPosts()}
						className={`text-center h-fit w-full border-2 text-xl hover:bg-LightGray/20 transition-all duration-300 p-4 px-8 rounded-2xl poppinsFont700${
							(postsCount - 1) * 30 > posts.length ? "hidden" : ""
						}`}
					>
						Załaduj więcej
					</button>
				</div>
			</div>
		);
	else return <LoadingLayout />;
}
