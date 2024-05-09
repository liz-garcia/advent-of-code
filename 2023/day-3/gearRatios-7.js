const symbols = ["*", "#", "+", "-", "/", "=", "&", "%", "@", "$"];

function sumAdjacentNumbers(engineSchematic) {
    const rows = engineSchematic.length;
    const cols = engineSchematic[0].length;
    let sum = 0;

    // Define helper function to check if a position is valid
    const isValidPosition = (i, j) => i >= 0 && i < rows && j >= 0 && j < cols;

    // Define directions for adjacent positions
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1],  // up, down, left, right
        [-1, -1], [-1, 1], [1, -1], [1, 1] // diagonals
    ];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Check if current character is a number
            if (!isNaN(engineSchematic[i][j])) {
                let adjacentToSymbol = false;
                // Check adjacent positions
                for (const [dx, dy] of directions) {
                    const x = i + dx;
                    const y = j + dy;
                    // Check if adjacent position is valid and contains a symbol
                    if (isValidPosition(x, y) && symbols.includes(engineSchematic[x][y])) {
                        adjacentToSymbol = true;
                        break;
                    }
                }
                if (adjacentToSymbol) {
                    sum += parseInt(engineSchematic[i][j]);
                }
            }
        }
    }
    return sum;
}

// Example engine schematic
const engineSchematic = [
    "467..114..",
    "...*......",
    "..35..633.",
    "......#...",
    "617*......",
    ".....+.58.",
    "..592.....",
    "......755.",
    "...$.*....",
    ".664.598.."
];

// Calculate sum
const result = sumAdjacentNumbers(engineSchematic);
console.log("Sum of all part numbers:", result);
