import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function PostGallery(props: { post: PostDataType }) {
	const [imgOpen, setImgOpen] = useState<string>();

	if (props.post.gallery.length != 0)
		return (
			<>
				<h2
					className={`text-center my-5 4xl:text-5xl text-sm !leading-[150%] h-fit xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl peer line-clamp-2 tracking-wide poppinsFont700`}
				>
					Galeria
				</h2>

				<div className="flex flex-wrap justify-center px-3 xs:px-7 gap-3 lg:px-24 xl:px-28 md:px-16 2xs:px-5 sm:px-10 2xl:px-48 3xl:px-64 4xl:px-80">
					{props.post.gallery.map((photo, index) => (
						<motion.img
							layoutId={index.toString()}
							onClick={() => setImgOpen(index.toString())}
							src={photo}
							width={300}
							height={100}
							alt="Gallery image"
							className="max-w-lg cursor-pointer aspect-[3/2] object-cover grow rounded-3xl"
							key={index}
						/>
					))}
				</div>

				<AnimatePresence>
					{imgOpen && (
						<motion.div
							onClick={() => setImgOpen(undefined)}
							className="w-full p-4 md:p-8 lg:p-12 2xl:p-20 h-full fixed top-0 flex items-center cursor-pointer justify-center left-0 z-40"
						>
							<motion.img
								layoutId={imgOpen}
								src={props.post.gallery[parseInt(imgOpen)]}
								alt="Gallery image"
								className="z-10 max-w-full max-h-full object-contain rounded-3xl"
							/>

							<motion.div
								initial={{ opacity: 0 }}
								exit={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="bg-MainDarkGray/50 fixed top-0 left-0 w-screen h-screen"
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</>
		);
}
