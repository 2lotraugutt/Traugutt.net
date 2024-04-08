export function HighlightSearchPhrase(text: string, searchPhrase: string): React.ReactNode {
	// Case-insensitive search
	const regex = new RegExp(`(${searchPhrase})`, "gi");
	const parts = text.split(regex);
	return parts.map((part, index) => {
		if (index % 2 === 1) {
			return (
				<span key={index} className="bg-MainColor/40">
					{part}
				</span>
			);
		}
		return part;
	});
}
