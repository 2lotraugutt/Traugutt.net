"use client";

import { MdPreview } from "md-editor-rt";
import "md-editor-rt/lib/preview.css";
import Image from "next/image";

export default function StageFour(props: { down: Function; up: Function; content: string }) {
	return (
		<div className="dashboard-post-page">
			<Image src="/newPost/Wave-4.svg" width="1920" height="1080" className="absolute top-0 right-0 w-full h-full object-center object-cover" alt="" />
			<div className="flex flex-col items-center gap-y-10 absolute top-1/2 w-full -translate-y-1/2">
				<div className="flex flex-col gap-y-3 max-w-xl">
					<h1 className={`text-6xl text-center poppinsFont700`}>Sprawdź treść</h1>
					<p className={`text-center px-5 text-lg poppinsFont400`}>
						Teraz się skup! Sprawdź czy wszystko się zgadza. Przeczytaj wszystko jeszcze raz i zobacz czy ładnie wygląda. Został nam już tylko
						<b className={`text-SecondColor poppinsFont600`}> jeden krok</b> i wszystko będzie gotowe.
					</p>
				</div>

				<div
					id="markdown-container"
					className={`border-2 border-MainColor max-h-96 overflow-y-auto text-sm w-2/3 p-3 rounded-2xl resize-none flex-col outline-none flex gap-y-1 md:gap-y-2 xl:gap-y-3 3xl:gap-y-5 poppinsFont400`}
				>
					<MdPreview editorId={"preview-only"} modelValue={props.content} />
				</div>

				<div className="flex justify-between w-full max-w-xl">
					<button onClick={() => props.down()} className={`bg-MainDarkGray px-8 py-3 text-white rounded-3xl plusJakartaSans600`}>
						Powrót
					</button>
					<button onClick={() => props.up()} className={`bg-MainColor px-8 py-3 text-white rounded-3xl plusJakartaSans600`}>
						Kontynuuj
					</button>
				</div>
			</div>
		</div>
	);
}
