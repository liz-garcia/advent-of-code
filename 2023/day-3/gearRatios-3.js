import fs from "fs";

const path = "2023/day-3/input.txt";
const schematic = fs.readFileSync(path, "utf-8");
const rows = schematic.split("\n");

let sum = 0;

const isNumber = (character) => {
  return !isNaN(character) && character !== ".";
};

const isPartNumber = (rows, rowIndex, columnIndex) => {
  const symbols = ["*", "#", "+", "-", "/", "=", "&", "%", "@", "$"];

  const directions = [
    [-1, 0], // Up
    [1, 0],  // Down
    [0, -1], // Left
    [0, 1],  // Right
    [-1, -1], // Top-Left diagonal
    [-1, 1],  // Top-Right diagonal
    [1, -1], // Bottom-Left diagonal
    [1, 1],  // Bottom-Right diagonal
  ];

  return directions.some(([rowOffset, colOffset]) => {
    let row = rowIndex + rowOffset;
    let col = columnIndex + colOffset;
    while (row >= 0 && row < rows.length && col >= 0 && col < rows[row].length) {
      if (symbols.includes(rows[row][col])) {
        return true;
      }
      if (!isNumber(rows[row][col])) {
        break;
      }
      row += rowOffset;
      col += colOffset;
    }
    return false;
  });
};

rows.forEach((row, rowIndex) => {
  row.split("").forEach((char, columnIndex) => {
    if (isNumber(char) && isPartNumber(rows, rowIndex, columnIndex)) {
      sum += parseInt(char, 10);
    }
  });
});

console.log(sum);
