import { Poppins } from "next/font/google";
import Image from "next/image";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});

export default function PostGallery(props: { post: PostDataTypeWithAuthorAndEvent }) {
	if (props.post.gallery.length != 0)
		return (
			<>
				<h2
					className={`text-center my-5 4xl:text-5xl text-sm !leading-[150%] h-fit xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl peer line-clamp-2 tracking-wide ${poppingsFont700.className}`}
				>
					Galeria
				</h2>

				<div className="flex flex-wrap justify-center px-3 xs:px-7 gap-3 lg:px-24 xl:px-28 md:px-16 2xs:px-5 sm:px-10 2xl:px-48 3xl:px-64 4xl:px-80">
					{props.post.gallery.map((photo, index) => (
						<img src={photo} width={300} height={100} alt="Gallery image" className="max-w-lg aspect-[3/2] object-cover grow rounded-3xl" key={index} />
					))}
				</div>
			</>
		);
}
