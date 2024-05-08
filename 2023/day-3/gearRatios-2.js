/* Context:
    - We are given a string representing the engine schematic.
    - Any number adjacent (even diagonally) to a symbol (except ".") is a PART NUMBER.
    - We need to find the SUM of all the PART NUMBERS.

    Process:
    - Iterate through the engine schematic. Go through each character in the string representing the schematic.
    - Identify PART NUMBERS. For each character, check if it's a number, and if it's adjacent (up, down, left, right, or diagonally) to a symbol (except ".").
    - Extract and ADD Numbers: If it is a PART NUMBER, convert it to a number and add it to a running total.
*/

import fs from "fs";

// Read schematic input and turn it into an array of rows.
const path = "2023/day-3/input.txt";
const schematic = fs.readFileSync(path, "utf-8");
const rows = schematic.split("\n");

// Define `let` variable for total "sum":
let sum = 0;

// Define isNumber conditions:
// Identify numbers withing the string
// Check if it's a number and not "."
const isNumber = (character) => {
  return !isNaN(character) && character !== ".";
};

// Define isPartNumber conditions:
const isPartNumber = (rows, rowIndex, characterIndex) => {
  // Possible symbols to check for:
  const symbols = ["*", "+", "-", "/", "=", "&", "%", "@", "$"];

  // Possible directions to check for:
  const directions = [
    [rowIndex - 1, characterIndex], // Up
    [rowIndex + 1, characterIndex], // Down
    [rowIndex, characterIndex - 1], // Left
    [rowIndex, characterIndex + 1], // Right
    [rowIndex - 1, characterIndex - 1], // Top-Left diagonal
    [rowIndex - 1, characterIndex + 1], // Top-Right diagonal
    [rowIndex + 1, characterIndex - 1], // Bottom-Left diagonal
    [rowIndex + 1, characterIndex + 1], // Bottom-Right diagonal
  ];

  // Check all directions (including diagonals)
  return symbols.some((symbol) => {
    return directions.some(([row, column]) => {
      return (
        row >= 0 && // Check if row is not out of bounds (above schematic)
        row < rows.length && // Check if row is not out of bounds (below schematic)
        column >= 0 && // Check if column is not out of bounds (left)
        column < rows[row].length && // Check if column is not out of bounds (right)
        rows[row][column] === symbol // Check if character at position matches symbol
      );
    });
  });
};

// Iterate through each row
rows.forEach((row, rowIndex) => {
  // Iterate through each character
  row.split("").forEach((char, characterIndex) => {
    if (isNumber(char) && isPartNumber(char, rows, rowIndex, characterIndex)) {
      sum += parseInt(char);
    }
  });
});

console.log(sum);
