"use client";

import StageZero from "@/components/newPostStages/stageZero";
import { useState } from "react";

export default function Page() {
	const [stage, setStage] = useState(0);

	function stageUp() {
		setStage((oldStage) => oldStage + 1);
	}
	function stageDown() {
		setStage((oldStage) => oldStage - 1);
	}

	if (stage == 0) return <StageZero up={stageUp} />;
	else setStage(0);
}
