import { TeacherDataType } from "@/global";
import { motion } from "framer-motion";
import { useState } from "react";

export default function TeacherCard(props: { teacher: TeacherDataType }) {
	const [hovered, setHovered] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 group"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<img src={props.teacher.image} alt={props.teacher.name} className="w-full h-60 object-cover" />
			<div className="p-6 flex flex-col gap-2">
				<h3 className="text-xl font-semibold text-MainDarkGray flex items-end">
					{props.teacher.title && <span className="text-MainDarkGray/60 text-base mr-0.5">{props.teacher.title}</span>}
					{props.teacher.name}
				</h3>
				<a href={`mailto:${props.teacher.email}`} className="text-sm text-MainColor hover:text-SecondColor transition">
					{props.teacher.email}
				</a>
				<div className="text-sm text-gray-700 space-y-1">
					<p>
						<span className="font-semibold">Przedmioty:</span> {props.teacher.subjects.join(", ")}
					</p>
					{props.teacher.class && (
						<p>
							<span className="font-semibold">Wychowawca:</span> {props.teacher.class}
						</p>
					)}
				</div>

				<motion.p animate={{ height: hovered ? "auto" : "96px" }} transition={{ duration: 0.4, ease: "easeInOut" }} className="text-sm text-gray-600 mt-3 overflow-hidden">
					{props.teacher.description}
				</motion.p>
			</div>
		</motion.div>
	);
}
