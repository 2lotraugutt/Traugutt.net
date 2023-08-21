import { Poppins } from "next/font/google";
import PostTile from "./postTile";

const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});

export default function PostContainer() {
	const examplePosts = [
		{
			id: 0,
			title: "To jest pierwszy testowy post",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum provident nam accusantium rerum explicabo tenetur non voluptates corrupti, vero deleniti cupiditate dolor repellendus ullam quasi recusandae est perferendis dolorem necessitatibus incidunt.Quae repellendus necessitatibus deserunt ut voluptate magni, hic alias.",
			image: "/Archiwum.png",
			date: "21-08-2023",
		},
		{
			id: 1,
			title: "To jest juz drugi testowy post - środkowy",

			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum provident nam accusantium rerum explicabo tenetur non voluptates corrupti, vero deleniti cupiditate dolor repellendus ullam quasi recusandae est perferendis dolorem necessitatibus incidunt.Quae repellendus necessitatibus deserunt ut voluptate magni, hic alias.",
			image: "/Archiwum.png",
			date: "21-08-2023",
		},
		{
			id: 2,
			title: "To jest az trzeci i ostani testowy post",

			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum provident nam accusantium rerum explicabo tenetur non voluptates corrupti, vero deleniti cupiditate dolor repellendus ullam quasi recusandae est perferendis dolorem necessitatibus incidunt.Quae repellendus necessitatibus deserunt ut voluptate magni, hic alias.",
			image: "/Archiwum.png",
			date: "21-08-2023",
		},
	];

	return (
		<section className="w-full flex flex-col items-center gap-y-5 md:gap-y-8 xl:gap-y-10 2xl:gap-y-14 4xl:gap-y-16">
			<div className="grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-2 lg:gap-3 4xl:grid-cols-3">
				{examplePosts.map((examplePost) => (
					<PostTile
						id={examplePost.id}
						date={examplePost.date}
						description={examplePost.description}
						title={examplePost.title}
						image={examplePost.image}
						key={examplePost.id}
					/>
				))}
			</div>

			<button
				className={`text-MainDarkGray bg-white border-MainDarkGray border-2 text-xs xs:text-sm md:text-base xl:text-lg px-8 py-1.5 2xl:text-lg 3xl:text-xl 3xl:py-2 3xl:px-12 rounded-3xl hover:bg-MainDarkGray hover:text-white transition-all duration-200 ease-out ${poppingsFont600.className}`}
			>
				Załaduj więcej
			</button>
		</section>
	);
}
