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
        for (let j = Math.max(0, column - 1); j <= Math.min(numCols - 1, column + number.length); j++) {
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
            return true;
        }
    }

    return false;
}

// Example usage
let rows = [
    ".........426.............985.........40..........207............................841..463................................633........17.384...",
    "531&......+..........125....-..312..........#........895......998..945.....@......$.....-...33...................353.....*........*.........",
    "........................#......*...........21..727..*..../..-./.............545......80...................602......@..272.......743.........",
    "...........558.577..........486...186*925.....*....483.883.1....286...................................625..................#474.....491.....",
    "..............*.........243.................287................*............$....245............830.........793......#..........306..*......"
];
let partNumbers = [];

rows.forEach((row) => {
    let numbers = row.match(/\d+/g);
    if (numbers) {
        numbers.forEach((number) => {
            isPartNumber(rows, number, partNumbers);
        });
    }
});

console.log(partNumbers);
