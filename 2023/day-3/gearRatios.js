import fs from "fs";

const path = "2023/day-3/input.txt";
const schematic = fs.readFileSync(path, "utf-8");
const rows = schematic.split("\n");


// Identify a set of symbols within the input.
const symbolsSet = new Set();
rows.forEach(row => {
    const rowSymbols = row.split("").filter(symbol => {
      // Filter out points and numbers
      return !/\d|\./.test(symbol);
    });
    rowSymbols.forEach(symbol => symbolsSet.add(symbol));
  });
const symbols = Array.from(symbolsSet);

console.log(symbols);

// let sum = 0;