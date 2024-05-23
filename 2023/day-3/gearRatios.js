import fs from "fs";

const path = "2023/day-3/input.txt";
const input = fs.readFileSync(path, "utf-8"); // Read file
const schematic = input.split("\n"); // Input array

// ^ Part One

// * Symbols Set
const symbolsSet = new Set(); // Use Set to store -unique- values of any type, in this case: an array of strings, where each string is a symbol.

schematic.forEach((row) => {
  // Filter through characters in each row. Test for symbols (not a digit, not a ".")
  const symbols = row.split("").filter((character) => !/\d|\./.test(character));

  // Add `symbols` from this row to `symbolsSet`
  symbols.forEach((symbol) => symbolsSet.add(symbol));
});

const symbols = Array.from(symbolsSet);

// * PartNumbers per Row
function getPartNumbers(rows, row, rowIndex) {
  const partNumbers = [];

  // Regular expression to match all numbers in the string
  const regex = /\d+/g;
  let match;

  while ((match = regex.exec(row)) !== null) {
    // Get the matched number and its position
    const number = match[0];
    const startIndex = match.index;
    const endIndex = regex.lastIndex - 1;

    // Identify rows on top and below current `row`
    const topRow = rowIndex > 0 ? rows[rowIndex - 1] : null;
    const bottomRow = rowIndex < rows.length - 1 ? rows[rowIndex + 1] : null;

    // Determine the characters to the left and right of the number
    const leftChar = startIndex > 0 ? row[startIndex - 1] : null;
    const rightChar = endIndex < row.length - 1 ? row[endIndex + 1] : null;

    // Determine diagonal characters surrounding the number
    let topLeftChar;
    let topRightChar;
    let bottomLeftChar;
    let bottomRightChar;

    // Determine characters directly on top and directly below the number
    let topChars = [];
    let bottomChars = [];

    if (topRow) {
      topLeftChar = leftChar ? topRow[startIndex - 1] : null;
      topRightChar = rightChar ? topRow[endIndex + 1] : null;
      for (let i = startIndex; i <= endIndex; i++) {
        topChars.push(topRow[i]);
      }
    } else {
      topLeftChar = topRightChar = null;
    }

    if (bottomRow) {
      bottomLeftChar = leftChar ? bottomRow[startIndex - 1] : null;
      bottomRightChar = rightChar ? bottomRow[endIndex + 1] : null;
      for (let i = startIndex; i <= endIndex; i++) {
        bottomChars.push(bottomRow[i]);
      }
    } else {
      bottomLeftChar = bottomRightChar = null;
    }

    // Construct surroundingChars excluding null values
    const surroundingChars = [
      topLeftChar,
      ...topChars,
      topRightChar,
      bottomLeftChar,
      ...bottomChars,
      bottomRightChar,
      leftChar,
      rightChar,
    ].filter((char) => char !== null); // Remove any null values

    for (let symbol of symbols) {
      if (surroundingChars.includes(symbol)) {
        partNumbers.push(number);
      }
    }
  }

  return partNumbers;
}

// * Get All PartNumbers
function getAllPartNumbers(rows) {
  const allPartNumbers = [];

  rows.forEach((row, rowIndex) => {
    const rowPartNumbers = getPartNumbers(schematic, row, rowIndex);

    if (rowPartNumbers.length > 0) {
      allPartNumbers.push(...rowPartNumbers);
    }
  });

  return allPartNumbers;
}

// * Sum All PartNumbers
function sumTotalPartNumbers(rows) {
  const totalPartNumbers = getAllPartNumbers(rows);
  let sum = 0;

  for (let partNumber of totalPartNumbers) {
    sum += parseInt(partNumber, 10);
  }

  return sum;
}

console.log(sumTotalPartNumbers(schematic));
// Output: 546312

// ^ Part Two

// * Get GearRatios, per Row
function getGearRatios(rows, row, rowIndex) {
  const gearRatios = [];
  const regex = /\*/g;
  let match;

  const matrixes = [];

  while ((match = regex.exec(row)) !== null) {
    // Get the current character and its position
    const currentChar = match[0];
    const index = match.index;

    // Identify rows on top and below current `row`
    const topRow = rowIndex > 0 ? rows[rowIndex - 1] : null;
    const bottomRow = rowIndex < rows.length - 1 ? rows[rowIndex + 1] : null;


    // Determine characters to the left and right
    const leftChar = index > 0 ? row[index - 1] : null;
    const rightChar = index < row.length - 1 ? row[index + 1] : null;

    // Determine top, bottom and diagonal characters
    let topLeftChar;
    let topChar;
    let topRightChar;
    let bottomLeftChar;
    let bottomChar;
    let bottomRightChar;

    if (topRow) {
      topChar = topRow[index];
      topLeftChar = leftChar ? topRow[index - 1] : null;
      topRightChar = rightChar ? topRow[index + 1] : null;
    } else {
      topChar = topLeftChar = topRightChar = null;
    }

    if (bottomRow) {
      bottomChar = bottomRow[index];
      bottomLeftChar = leftChar ? bottomRow[index - 1] : null;
      bottomRightChar = rightChar ? bottomRow[index + 1] : null;
    } else {
      bottomChar = bottomLeftChar = bottomRightChar = null;
    }

    // Construct surroundingChars excluding null values
    const currentMatrix = [
      topLeftChar,
      topChar,
      topRightChar,
      leftChar,
      currentChar,
      rightChar,
      bottomLeftChar,
      bottomChar,
      bottomRightChar,
    ].filter((char) => char !== null); // Remove any null values

    matrixes.push(currentMatrix);
  }

  console.log(matrixes);

  return gearRatios;
}

console.log(getGearRatios(schematic, schematic[1], 1));
