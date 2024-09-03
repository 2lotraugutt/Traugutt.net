"use client";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import Image from "next/image";
import { useState } from "react";

export default function StageThree(props: { down: Function; up: Function; setContent: Function; initContent: string }) {
	const [content, setContent] = useState(props.initContent);

	function nextStage() {
		props.setContent(content);
		props.up();
	}

	return (
		<div className="dashboard-post-page">
			<Image src="/newPost/Wave-3.svg" width="1920" height="1080" className="absolute top-0 right-0 w-full h-full object-center object-cover" alt="" />
			<div className="flex flex-col items-center gap-y-10 absolute top-1/2 w-full -translate-y-1/2">
				<div className="flex flex-col gap-y-3 max-w-xl">
					<h1 className={`text-6xl text-center poppinsFont700`}>Napisz posta</h1>
					<p className={`text-center px-5 text-lg poppinsFont400`}>
						Przyszedł czas na najważniejsze! To ten moment, na który czekaliśmy! Czas się rozpisać, napisać treść twojego postu.
						<b className={`text-SecondColor poppinsFont600`}> Do roboty!</b>
					</p>
				</div>

				<MdEditor modelValue={content} onChange={setContent} language="en-US" noUploadImg className="!w-3/4" />

				<div className="flex justify-between w-full max-w-xl">
					<button onClick={() => props.down()} className={`bg-MainDarkGray px-8 py-3 text-white rounded-3xl plusJakartaSans600`}>
						Powrót
					</button>
					<button onClick={() => nextStage()} className={`bg-MainColor px-8 py-3 text-white rounded-3xl plusJakartaSans600`}>
						Kontynuuj
					</button>
				</div>
			</div>
		</div>
	);
}
