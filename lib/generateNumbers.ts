import path from "path";
import fs from "fs";
import cron from "node-cron";

const dataFilePath = path.join(process.cwd(), "data.json");

let leftNumbers: number[] = Array.from({ length: 35 }, (v, k) => k + 1);

try {
	const data = fs.readFileSync(dataFilePath, "utf8");
	leftNumbers = JSON.parse(data);
} catch (error) {
	console.error("Error reading data file:", error);
}

function GenerateNumbers() {
	let generatedNumbers: number[] = [];

	for (let i = 0; i < 5; i++) {
		const randomNumber = Math.floor(Math.random() * leftNumbers.length);
		generatedNumbers.push(leftNumbers.splice(randomNumber, 1)[0]);
	}
	if (leftNumbers.length == 0) leftNumbers = Array.from({ length: 35 }, (v, k) => k + 1);
	fs.writeFileSync(dataFilePath, JSON.stringify(leftNumbers), "utf8");

	return { generatedNumbers, leftNumbers };
}

// // Schedule to check every minute
// setInterval(GenerateNumbers, 1000);
cron.schedule("0 0 * * 5", () => {
	console.log(GenerateNumbers());
	// Place your desired logic here
});
