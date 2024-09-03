"use client";

import { MdPreview } from "md-editor-rt";

function MarkdownDisplay(props: { text: string | null }) {
	return (
		<div
			id="markdown-container"
			className={`px-3 xs:px-7 flex-col flex gap-y-1 md:gap-y-2 xl:gap-y-3 3xl:gap-y-5 lg:px-24 xl:px-28 md:px-16 2xs:px-5 sm:px-10 2xl:px-48 3xl:px-64 4xl:px-80 py-4 xl:py-20 md:py-12 lg:py-14 sm:py-9 xs:py-6 poppinsFont400`}
		>
			<MdPreview editorId={"preview-only"} modelValue={props.text ?? "# Brak opisu..."} />
		</div>
	);
}

export default MarkdownDisplay;
