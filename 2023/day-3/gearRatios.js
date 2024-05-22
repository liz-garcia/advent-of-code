import fs from "fs";

const path = "2023/day-3/input.txt";
const input = fs.readFileSync(path, "utf-8"); // Read file
const schematic = input.split("\n"); // Input array

// * Symbols Set
const symbolsSet = new Set(); // Use Set to store -unique- values of any type, in this case: an array of strings, where each string is a symbol.

schematic.forEach((row) => {
  // Filter through characters in each row. Test for symbols (not a digit, not a ".")
  const symbols = row.split("").filter((character) => !/\d|\./.test(character));

  // Add `symbols` from this row to `symbolsSet`
  symbols.forEach((symbol) => symbolsSet.add(symbol));
});

const symbols = Array.from(symbolsSet);
console.log(symbols);

// * Numbers and surrounding Characters, per Row
function processNumbersInString(rows, row, rowIndex) {
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

    // Perform actions on the number
    console.log(`\n Processing number ${number} at index ${startIndex}`);
    console.log(`Left character: ${leftChar === null ? "None" : leftChar}`);
    console.log(`Right character: ${rightChar === null ? "None" : rightChar}`);
    console.log(`Top-Left character: ${topLeftChar === null ? "None" : topLeftChar}`);
    console.log(`Top-Right character: ${topRightChar === null ? "None" : topRightChar}`);
    console.log(`Top characters: ${!topChars.length ? "None" : topChars}`);
    console.log(`Bottom-Left character: ${bottomLeftChar === null ? "None" : bottomLeftChar}`);
    console.log(`Bottom-Right character: ${bottomRightChar === null ? "None" : bottomRightChar}`);
    console.log(`Bottom characters: ${!bottomChars.length ? "None" : bottomChars}`);

    // Construct surroundingChars excluding null values
    const surroundingChars = [
        topLeftChar, 
        ...topChars, 
        topRightChar, 
        bottomLeftChar, 
        ...bottomChars, 
        bottomRightChar, 
        leftChar, 
        rightChar
      ].filter(char => char !== null);

    console.log(surroundingChars);
  }
}

processNumbersInString(schematic, schematic[schematic.length -1], schematic.length -1);
