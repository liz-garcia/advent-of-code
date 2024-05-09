import fs from "fs";

const path = "2023/day-3/input.txt";
const puzzleInput = fs.readFileSync(path, "utf-8");
const engineSchematic = puzzleInput.split("\r\n");

function sumAdjacentParts(schematic) {
    // Function to check if a character is a digit
    function isDigit(char) {
        return /\d/.test(char);
    }

    let sum = 0;

    for (let i = 0; i < schematic.length; i++) {
        const char = schematic[i];

        // If the character is a digit
        if (isDigit(char)) {
            let num = parseInt(char);

            // Check adjacent characters in all 8 directions
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const adjIndex = i + dx + dy * 100; // Using 100 as the width of the schematic

                    // Check if adjacent index is within bounds and if it's a digit
                    if (adjIndex >= 0 && adjIndex < schematic.length && isDigit(schematic[adjIndex])) {
                        num += parseInt(schematic[adjIndex]);
                    }
                }
            }

            // Add the summed number to the total sum
            sum += num;
        }
    }

    return sum;
}

console.log(sumAdjacentParts(engineSchematic));
