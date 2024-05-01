import fs from "fs";

/* Which games would have been possible if the bag contained (in total) only `12 red, 13 green, 14 blue`. That is:

    --> Evaluate each GAME to determine if its SUBSETS accomplish the following conditions:
    - per SUBSET, Red values are always 12 or less.
    - per SUBSET, Green values are always 13 or less.
    - per SUBSET, Blue values are always 14 or less.
    - Total cubes per SUBSET are always 39 or less (?) (in case there's randomly an extra color in any subset?)

    --> Each GAME input looks like this:
    Game 1: 4 green, 7 blue; 2 blue, 4 red;
            5 blue, 2 green, 2 red;
            1 green, 3 red, 9 blue;
            3 green, 9 blue;
            7 green, 2 blue, 2 red

    --> Process each GAME input into an object:
    {
      id: number,
      name: string,
      subsets: [
        {
          red: 
          green:
          blue:
        }, (...)
      ]
      topRed: number,
      topGreen: number,
      topBlue: number,
    }

    --> Consider:
    - Each GAME includes its ID in its name, like: Game 11.
    - SUBSETS are 1 or more per GAME.
    - SUBSETS are separated by semi-colons ;
    - SUBSETS may return all 3 colors  or less colors. (or none?). Not always every color exists within the SUBSET.
    - Final Answer will be equivalent to the SUM of the IDs of all POSSIBLE games.
*/

const inputPath = "2023/day-2/input.txt";
const games = fs.readFileSync(inputPath, "utf-8").split("\n");

// const gameObjects = (games) => {
//   return games.map((string) => {
//       return string.split(splitParam).map((item) => item.trim());
//   });
// }

// const filterPossibleGames = (gamesArray) => {
//   // First: turn each GAME String into an Object with key-value pairs for 'id' and 'subsets'; 'subsets' property should be an array from the string of comma-separated values.
//   return gamesArray;
// }

console.log(filterPossibleGames(games));
