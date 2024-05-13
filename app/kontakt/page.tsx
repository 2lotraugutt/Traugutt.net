import MarkdownDisplay from "@/lib/markdownDisplay";
import { promises as fs } from "fs";
import "md-editor-rt/lib/preview.css";

export default async function Page() {
	const text = await fs.readFile(process.cwd() + `/content/kontakt.mdx`, "utf8");

	return <MarkdownDisplay text={text} />;
}
