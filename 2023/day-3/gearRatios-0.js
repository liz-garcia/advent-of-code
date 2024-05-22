import fs from "fs";

const path = "2023/day-3/input.txt";
const schematic = fs.readFileSync(path, "utf-8");
const rows = schematic.split("\n");

// * Symbols
// const symbolsSet = new Set();
// rows.forEach((row) => {
//   const rowSymbols = row.split("").filter((symbol) => {
//     return !/\d|\./.test(symbol);
//   });
//   rowSymbols.forEach((symbol) => symbolsSet.add(symbol));
// });
// const symbols = Array.from(symbolsSet);

// * Numbers
// const numbersSet = new Set();
// rows.forEach((line) => {
//   let number = "";
//   [...line].forEach((char) => {
//     if (/\d/.test(char)) {
//       number += char;
//     } else {
//       if (number !== "") {
//         numbersSet.add(number);
//         number = "";
//       }
//     }
//   });
//   if (number !== "") {
//     numbersSet.add(number);
//   }
// });
// const numbers = Array.from(numbersSet);

//* isPartNumber
function isPartNumber(rows, number, partNumbers) {
  const symbols = ["*", "#", "+", "-", "/", "=", "&", "%", "@", "$"];

  // Find the row and column of the number
  let row = -1;
  let column = -1;
  for (let i = 0; i < rows.length; i++) {
    let index = rows[i].indexOf(number);
    if (index !== -1) {
      row = i;
      column = index;
      break;
    }
  }

  if (row === -1 || column === -1) {
    console.log("Number not found in the rows.");
    return false;
  }

  // Get surrounding values
  let surroundingValues = [];
  let numRows = rows.length;
  let numCols = rows[0].length;
  for (let i = Math.max(0, row - 1); i <= Math.min(numRows - 1, row + 1); i++) {
    for (
      let j = Math.max(0, column - 1);
      j <= Math.min(numCols - 1, column + number.length);
      j++
    ) {
      if (i === row && j >= column && j < column + number.length) {
        // Skip adding the number itself to surroundingValues
        continue;
      }
      surroundingValues.push(rows[i][j]);
    }
  }

  // Check if any symbol is present in surroundingValues
  for (let symbol of symbols) {
    if (surroundingValues.includes(symbol)) {
      partNumbers.push(number);
      sum += parseInt(number, 10);
      return true;
    }
  }

  return false;
}

// Usage
let partNumbers = [];
let sum = 0;

// numbers.forEach((number) => {
//     rows.forEach((row, rowIndex) => {
//       if (row.includes(number)) {
//         for (let i = 0; i < number.length; i++) {
//           const character = number[i];
//           const columnIndex = row.indexOf(character); // Get index of the digit within the row
//           if (columnIndex !== -1 && isPartNumber(symbols, rows, rowIndex, columnIndex)) {
//             // Character found and surrounded by symbols, continue checking other digits
//             partNumbers.push(number);
//             sum += parseInt(number, 10);
//           } else {
//             // Non-symbol found or character not present, break out of loop
//             break;
//           }
//         }
//         // If the entire loop completes, all digits were surrounded by symbols
//         if (i === number.length) {
//           partNumbers.push(number);
//           sum += parseInt(number, 10);
//         }
//       }
//     });
//   });

// numbers.forEach((number) => {
//     rows.forEach((row) => {
//         let numbers = row.match(/\d+/g);
//         if (numbers) {
//             numbers.forEach((number) => {
//                 isPartNumber(rows, number, partNumbers);
//             });
//         }
//     });
// });

rows.forEach((row) => {
  let numbers = row.match(/\d+/g);
  if (numbers) {
    numbers.forEach((number) => {
      isPartNumber(rows, number, partNumbers);
    });
  }
});

console.log(partNumbers, sum);
