import fs from "fs";

const puzzleInputPath = "2023/day-2/puzzleInput.txt";
const puzzleInput = fs.readFileSync(puzzleInputPath, "utf-8").split("\n");

console.log(puzzleInput);
