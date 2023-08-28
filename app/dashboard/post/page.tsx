"use client";

import StageOne from "@/components/newPostStages/stageOne";
import StageZero from "@/components/newPostStages/stageZero";
import { useState } from "react";

export default function Page() {
	const [stage, setStage] = useState(0);
	const [title, setTitle] = useState("");

	function stageUp() {
		setStage((oldStage) => oldStage + 1);
	}
	function stageDown() {
		setStage((oldStage) => oldStage - 1);
	}

	if (stage == 0) return <StageZero up={stageUp} />;
	if (stage == 1) return <StageOne down={stageDown} up={stageUp} setTitle={(text: string) => setTitle(text)} />;
	else setStage(0);
}
