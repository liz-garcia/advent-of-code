import fs from "fs";

const path = "2023/day-3/input.txt";
const schematic = fs.readFileSync(path, "utf-8");
const rows = schematic.split("\n");

// * Symbols
const symbolsSet = new Set();
rows.forEach((row) => {
  const rowSymbols = row.split("").filter((symbol) => {
    return !/\d|\./.test(symbol);
  });
  rowSymbols.forEach((symbol) => symbolsSet.add(symbol));
});
const symbols = Array.from(symbolsSet);

// * Numbers
const numbersSet = new Set();
rows.forEach((line) => {
  let number = "";
  [...line].forEach((char) => {
    if (/\d/.test(char)) {
      number += char;
    } else {
      if (number !== "") {
        numbersSet.add(number);
        number = "";
      }
    }
  });
  if (number !== "") {
    numbersSet.add(number);
  }
});
const numbers = Array.from(numbersSet);

//* isPartNumber
const isPartNumber = (number, rowIndex, columnIndex) => {
  let surroundingValues = [];

  const length = number.length;

  const positions = [
    [rowIndex - 1, columnIndex - 1], // Top-Left
    [rowIndex - 1, columnIndex], // Up
    [rowIndex - 1, columnIndex + 1], // Top-Right
    [rowIndex, columnIndex + 1], // Right
    [rowIndex + 1, columnIndex + 1], // Bottom-Right
    [rowIndex + 1, columnIndex], // Down
    [rowIndex + 1, columnIndex - 1], // Bottom-Left
    [rowIndex, columnIndex - 1], // Left
  ];

  for (const position of positions) {
    const [row, column] = position;
    if (
      row >= 0 &&
      row < input.length &&
      column >= 0 &&
      column < input[0].length &&
      input[row][column] !== " "
    ) {
      surroundingValues.push(input[row][column]);
    } else {
      surroundingValues.push(null); // Push null for out-of-bounds positions
    }
  }

  return surroundingValues.some(value => symbols.includes(value));
};

let str = ".........426.............985.........40..........207............................841..463................................633........17.384...";
let index = str.indexOf("426");
console.log("426");

const strTwo = "426";
console.log(strTwo.length);
