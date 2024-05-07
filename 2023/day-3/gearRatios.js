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
const inputPath = "2023/day-3/input.txt";
const schematic = fs.readFileSync(inputPath, "utf-8").split("\n");

const findPartNumbers = (input) => {
    input.forEach((row) => {
        //
    });
};
