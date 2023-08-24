import React from "react";

export default function markdownToHtml(markdown: string): JSX.Element[] {
	const lines = markdown.trim().split("\n");
	let newLines: string[] = [];

	lines.map((line) => {
		if (line != "") newLines.push(line);
	});

	const elements: JSX.Element[] = [];

	while (newLines.length > 0) {
		if (newLines[0].startsWith("#")) {
			const headingLevel = newLines[0].match(/^#+/)?.[0].length || 1;
			const headingText = newLines[0].replace(/^#+\s*/, "");

			elements.push(React.createElement(`h${headingLevel}`, {}, headingText));
		} else if (newLines[0].startsWith("- ") || newLines[0].startsWith("* ")) {
			let points: JSX.Element[] = [];

			while (newLines[0].startsWith("- ") || newLines[0].startsWith("* ")) {
				const text = newLines[0].replace(/[-*]\s/g, "");
				points.push(<li>{inlineMarkdownToHtml(text)}</li>);
				newLines.shift();
			}

			elements.push(<ul>{points}</ul>);
		} else if (/^[0-9]+\.\s/.test(newLines[0])) {
			let points: JSX.Element[] = [];

			while (/^[0-9]+\.\s/.test(newLines[0])) {
				const text = newLines[0].replace(/^[0-9]+\.\s/, "");
				points.push(<li>{inlineMarkdownToHtml(text)}</li>);
				newLines.shift();
			}

			elements.push(<ol>{points}</ol>);
		} else if (newLines[0].startsWith("> ")) {
			let blackQuotes: JSX.Element[] = [];

			while (newLines[0].startsWith("> ")) {
				const text = newLines[0].replace(/^>\s*/, "");

				blackQuotes.push(
					<>
						{inlineMarkdownToHtml(text)} <br></br>
					</>
				);

				newLines.shift();
			}

			elements.push(<div className="blackQuote">{blackQuotes}</div>);
		} else {
			const text = newLines[0];
			elements.push(<p>{inlineMarkdownToHtml(text)}</p>);
		}

		newLines.shift();
	}

	return elements;
}

function inlineMarkdownToHtml(markdown: string) {
	const regex = /(\*\*|\*|__|_|~~|`)(.*?)\1/g;
	const regexLink = / \[(.*?)\]\((.*?)\)/g;

	const parts: (string | JSX.Element)[] = [];
	let lastIndex = 0;

	markdown.replace(regex, (match, marker, content, index) => {
		const newMarkdown = markdown.slice(lastIndex, index);
		let insideLastIndex = 0;

		newMarkdown.slice(insideLastIndex).replace(regexLink, (match, name, link, insideIndex) => {
			parts.push(markdown.slice(insideLastIndex, insideIndex)); // Add text before the match
			parts.push(<a href={link}> {name}</a>);

			insideLastIndex = insideIndex + match.length; // Update the last index
			return match;
		});
		if (insideLastIndex < newMarkdown.length) {
			parts.push(newMarkdown.slice(insideLastIndex)); // Add any remaining text
		}

		if (marker == "**") parts.push(<b key={index}>{content}</b>);
		if (marker == "*") parts.push(<i key={index}>{content}</i>);
		if (marker == "__") parts.push(<u key={index}>{content}</u>);
		if (marker == "_") parts.push(<i key={index}>{content}</i>);
		if (marker == "~~") parts.push(<s key={index}>{content}</s>);
		if (marker == "`")
			parts.push(
				<div key={index} className="inline-code">
					{content}
				</div>
			);

		lastIndex = index + match.length; // Update the last index

		return content;
	});

	if (lastIndex < markdown.length) {
		markdown.slice(lastIndex).replace(regexLink, (match, name, link, index) => {
			parts.push(markdown.slice(lastIndex, index)); // Add text before the match
			parts.push(<a href={link}> {name}</a>);

			lastIndex = lastIndex + index + match.length; // Update the last index
			return match;
		});
	}

	if (lastIndex < markdown.length) {
		parts.push(markdown.slice(lastIndex)); // Add any remaining text
	}

	return <>{parts}</>;
}
