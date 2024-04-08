import { motion } from "framer-motion";

export default function LoadingTile() {
	return (
		<motion.div className="flex flex-row justify-center bg-white rounded-lg md:rounded-xl w-full p-1 md:p-2 lg:p-2.5">
			<div className="bg-MainDarkGray h-3 w-3 m-1.5 rounded-full animate-pulse"></div>
			<div className="bg-MainDarkGray h-3 w-3 m-1.5 rounded-full animate-pulse"></div>
			<div className="bg-MainDarkGray h-3 w-3 m-1.5 rounded-full animate-pulse"></div>
			<div className="bg-MainDarkGray h-3 w-3 m-1.5 rounded-full animate-pulse"></div>
			<div className="bg-MainDarkGray h-3 w-3 m-1.5 rounded-full animate-pulse"></div>
		</motion.div>
	);
}
