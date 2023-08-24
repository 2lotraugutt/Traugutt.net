import QuickMenu from "@/components/navigation/quickMenu";
import PostContainer from "@/components/posts/postsContainer";

export default function Home() {
	return (
		<div className="flex flex-col gap-y-10 sm:gap-y-12 3xl:gap-y-24 lg:gap-y-16 2xl:gap-y-20 md:gap-y-14 lg:px-12 px-2 md:px-5 pt-6 4xl:px-0">
			<QuickMenu />
			<PostContainer />
		</div>
	);
}
