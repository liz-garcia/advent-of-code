import fs from "fs";

const path = "2023/day-3/input.txt";
const input = fs.readFileSync(path, "utf-8"); // Read file
const schematic = input.split("\n"); // Input array

// * Find Symbols
const symbolsSet = new Set(); // Use Set to store -unique- values of any type, in this case: an array of strings, where each string is a symbol.

schematic.forEach((row) => {
  // Filter through characters in each row. Test for symbols (not a digit, not a ".")
  const symbols = row.split("").filter((character) => !/\d|\./.test(character));

  // Add `symbols` from this row to `symbolsSet`
  symbols.forEach((symbol) => symbolsSet.add(symbol));
});

const symbols = Array.from(symbolsSet);
console.log(symbols);
