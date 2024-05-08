import fs from "fs";

const path = "2023/day-3/input.txt";
const schematic = fs.readFileSync(path, "utf-8");
const rows = schematic.split("\n");

// Identify a `Set` of `symbols` within the input.
const symbolsSet = new Set();

rows.forEach((row) => {
  const rowSymbols = row.split("").filter((symbol) => {
    // Filter out points and numbers
    return !/\d|\./.test(symbol);
  });
  rowSymbols.forEach((symbol) => symbolsSet.add(symbol));
});

const symbols = Array.from(symbolsSet);

// Iterate through the input and identify the `numbers` within it.
const numbersSet = new Set();
rows.forEach((line) => {
  let number = "";
  [...line].forEach((char) => {
    if (/\d/.test(char)) {
      // If the character is a digit, append it to the current number
      number += char;
    } else {
      // If the character is not a digit and there is a number currently being formed, log it
      if (number !== "") {
        numbersSet.add(number);
        number = ""; // Reset the current number
      }
    }
  });
  // Check if there is a number at the end of the line
  if (number !== "") {
    numbersSet.add(number);
  }
});

// const numbers = Array.from(numbersSet);

// Identify partNumbers
// const isNumber = (character) => {
//   return !isNaN(character) && character !== ".";
// };

// const isPartNumber = (symbols, rows, rowIndex, columnIndex) => {
//   const positions = [
//     [rowIndex - 1, columnIndex], // Up
//     [rowIndex + 1, columnIndex],  // Down
//     [rowIndex, columnIndex - 1], // Left
//     [rowIndex, columnIndex + 1],  // Right
//     [rowIndex - 1, columnIndex - 1], // Top-Left
//     [rowIndex - 1, columnIndex + 1],  // Top-Right
//     [rowIndex + 1, columnIndex - 1], // Bottom-Left
//     [rowIndex + 1, columnIndex + 1],  // Bottom-Right
//   ];

//   for (const position of positions) {
//     const [row, column] = position;
//     if (row >= 0 && row < rows.length && column >= 0 && column < rows[row].length) {
//       if (symbols.includes(rows[row][column])) {
//         return true;
//       }
//     }
//   }

//   return false;
// };

const isPartNumber = (input, rowIndex, columnIndex) => {
  let surroundingValues = [];

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
      column < input[0].length
    ) {
      surroundingValues.push(input[row][column]);
    }
  }

  console.log(surroundingValues);
};

// Sum all fullPartNumbers
let sum = 0;

// numbers.forEach((number) => {
//   rows.forEach((row, rowIndex) => {
//     if (row.includes(number)) {
//       number.split("").forEach((character, columnIndex) => {
//         if (
//           isNumber(character) &&
//           isPartNumber(symbols, rows, rowIndex, columnIndex)
//         ) {
//           console.log(number);
//           sum += parseInt(number, 10);
//         }
//       });
//     }
//   });
// });

// console.log(symbols, numbers);
// console.log(sum);

isPartNumber(rows, 0, 0);
