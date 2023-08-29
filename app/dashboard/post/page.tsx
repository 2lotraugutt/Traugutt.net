"use client";

import StageSix from "@/components/postStages/newPostStageSix";
import StageZero from "@/components/postStages/newPostStageZero";
import StageFive from "@/components/postStages/stageFive";
import StageFour from "@/components/postStages/stageFour";
import StageOne from "@/components/postStages/stageOne";
import StageThree from "@/components/postStages/stageThree";
import StageTwo from "@/components/postStages/stageTwo";
import { useState } from "react";

export default function Page() {
	const [stage, setStage] = useState(0);
	const [title, setTitle] = useState("");
	const [image, setImage] = useState<File | any>();
	const [imageName, setImageName] = useState("");
	const [content, setContent] = useState("");
	const [gallery, setGallery] = useState<{ name: string; image: File }[]>([]);

	const [uploaded, setUploaded] = useState(false);

	function stageUp() {
		setStage((oldStage) => oldStage + 1);
	}
	function stageDown() {
		if (stage == 5 && content == "") setStage(3);
		else setStage((oldStage) => oldStage - 1);
	}
	async function upload() {
		try {
			const data = new FormData();
			data.set("title", title);
			data.set("image", image);
			data.set("content", content);
			for (const file of gallery) {
				data.append("gallery[]", file.image as any, file.image.name);
			}

			const res = await fetch("/api/dashboard/post", {
				method: "POST",
				body: data,
			});
			// handle the error
			if (!res.ok) throw new Error(await res.text());

			if (res.ok) setUploaded(true);
		} catch (e: any) {
			// Handle errors here
			console.error(e);
		}
	}

	if (stage == 0) return <StageZero up={stageUp} />;
	if (stage == 1) return <StageOne down={stageDown} up={stageUp} setTitle={(text: string) => setTitle(text)} initTitle={title} />;
	if (stage == 2)
		return (
			<StageTwo
				down={stageDown}
				up={stageUp}
				setImage={(image: File) => setImage(image)}
				setImageName={(name: string) => setImageName(name)}
				initImageName={imageName}
				initImage={image}
			/>
		);
	if (stage == 3) return <StageThree initContent={content} down={stageDown} up={stageUp} setContent={(content: string) => setContent(content)} />;
	if (stage == 4) {
		if (content != "") return <StageFour down={stageDown} up={stageUp} content={content} />;
		else {
			setStage(5);
			return <></>;
		}
	}
	if (stage == 5) return <StageFive down={stageDown} up={stageUp} setGallery={(gallery: { name: string; image: File }[]) => setGallery(gallery)} initGallery={gallery} />;
	if (stage == 6) return <StageSix down={stageDown} upload={upload} uploaded={uploaded} />;
	else setStage(0);
}
