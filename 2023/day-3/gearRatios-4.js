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

const numbers = Array.from(numbersSet);

// Identify partNumber: Find if a character position is surrounded by a symbol
const isPartNumber = (symbolsList, input, rowIndex, columnIndex) => {
  let surroundingValues = [];
  // console.log(input[rowIndex][columnIndex]);

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

  return surroundingValues.some(value => symbolsList.includes(value));
};

// Sum all PartNumbers
let sum = 0;
const partNumbers = [];

// numbers.forEach((number) => {
//   rows.forEach((row, rowIndex) => {
//     if (row.includes(number)) {
//       if (
//         row >= 0 &&
//         row < input.length &&
//         column >= 0 &&
//         column < input[0].length &&
//         input[row][column] !== " "
//       ) {
//         number.split("").forEach((character, columnIndex) => {
//           if (
//             isPartNumber(symbols, rows, rowIndex, columnIndex)
//           ) {
//             partNumbers.push(number);
//             sum += parseInt(number, 10);
//           }
//         });
//       };
//     }
//   });
// });

numbers.forEach((number) => {
  rows.forEach((row, rowIndex) => {
    if (row.includes(number)) {
      for (let i = 0; i < number.length; i++) {
        const character = number[i];
        const columnIndex = row.indexOf(character); // Get index of the digit within the row
        if (columnIndex !== -1 && isPartNumber(symbols, rows, rowIndex, columnIndex)) {
          // Character found and surrounded by symbols, continue checking other digits
          partNumbers.push(number);
          sum += parseInt(number, 10);
        } else {
          // Non-symbol found or character not present, break out of loop
          break;
        }
      }
      // If the entire loop completes, all digits were surrounded by symbols
      if (i === number.length) {
        partNumbers.push(number);
        sum += parseInt(number, 10);
      }
    }
  });
});

console.log(sum);
