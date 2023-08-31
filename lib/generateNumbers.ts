import path from "path";
import fs from "fs";
import cron from "node-cron";
import { endOfToday, format, getDate, nextDay, startOfDay, startOfToday, startOfTomorrow } from "date-fns";

type RangeType = 1 | 2 | 3 | 4 | 5;

const dataFilePath = path.join(process.cwd(), "data.json");

let leftNumbers: number[] = Array.from({ length: 35 }, (v, k) => k + 1);

try {
	const data = fs.readFileSync(dataFilePath, "utf8");
	leftNumbers = JSON.parse(data);
} catch (error) {
	console.error("Error reading data file:", error);
}

function GenerateNumbers() {
	let generatedNumbers: { number: Number; date: string }[] = [];

	for (let i = 0; i < 5; i++) {
		const dayNumber = (i + 1) as RangeType;

		const randomNumber = Math.floor(Math.random() * leftNumbers.length);
		generatedNumbers.push({ number: leftNumbers.splice(randomNumber, 1)[0], date: format(nextDay(startOfToday(), dayNumber), "dd-MM-yyyy") });
	}
	if (leftNumbers.length == 0) leftNumbers = Array.from({ length: 35 }, (v, k) => k + 1);
	fs.writeFileSync(dataFilePath, JSON.stringify(leftNumbers), "utf8");

	return generatedNumbers;
}

cron.schedule("0 0 * * 5", () => {
	console.log(GenerateNumbers());
});
