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
      ],
      maxColors: {
        red: number,
        green: number,
        blue: number
      }
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

// TODO: Turn each GAMEinput into an Object.
// Identify biggest RED, BLUE and GREEN input numbers.
const processInput = (strings) => {
  // Turn each string item into an array
  const arrays = strings.map((string) => {
    return string.split(":").map((item) => item.trim());
  });

  // Turn each array into an object
  const objects = arrays.map((array) => {
    const gameName = array[0];
    const gameSubsets = array[1];

    // Turn subsetsString into an array of strings
    const subsetsString = gameSubsets;
    const subsetsStrings = subsetsString
      .split(";")
      .map((subset) => subset.trim());

    //Turn subsetsArray into an array of objects
    const subsetsObjects = subsetsStrings.map((subsetString) => {
      // Each individual subset string into an array of strings, where each colorInput is a string
      const subsetArrayOfStrings = subsetString
        .split(",")
        .map((colorInput) => colorInput.trim());

      // Turn each subsetArrayOfStrings into an array of arrays, where each colorInputString becomes an array with the color input information.
      const subsetArrayOfArrays = subsetArrayOfStrings.map((colorInputString) =>
        colorInputString.split(" ")
      );

      // Each individual subset array of strings into an array of objects
      const subsetObject = {
        red: undefined,
        green: undefined,
        blue: undefined,
      };

      subsetArrayOfArrays.forEach((colorInputArray) => {
        const colorName = colorInputArray[1];
        const colorValue = parseInt(colorInputArray[0]);

        if (colorName === "red") {
          subsetObject.red = colorValue;
        }

        if (colorName === "green") {
          subsetObject.green = colorValue;
        }

        if (colorName === "blue") {
          subsetObject.blue = colorValue;
        }
      });

      return subsetObject;
    });

    const maxValues = subsetsObjects.reduce(
      (max, subset) => {
        if (
          subset.red !== undefined &&
          (max.red === undefined || max.red < subset.red)
        ) {
          max.red = subset.red;
        }

        if (
          subset.green !== undefined &&
          (max.green === undefined || max.green < subset.green)
        ) {
          max.green = subset.green;
        }

        if (
          subset.blue !== undefined &&
          (max.blue === undefined || max.blue < subset.blue)
        ) {
          max.blue = subset.blue;
        }

        return max;
      },
      { red: undefined, green: undefined, blue: undefined }
    );

    const object = {
      id: parseInt(gameName.replace(/\D/g, "")),
      name: gameName,
      subsets: subsetsObjects,
      maxColors: maxValues,
    };

    return object;
  });

  return objects;
};

const filterPossibleGames = (
  gamesData,
  possibleRedCubes,
  possibleGreenCubes,
  possibleBlueCubes
) => {

  return gamesData.filter((game) => {
    const red = game.maxColors.red;
    const green = game.maxColors.green;
    const blue = game.maxColors.blue;

    let redIsPossible;
    let greenIsPossible;
    let blueIsPossible;
    
    if (
      red !== undefined &&
      (red === possibleRedCubes || red < possibleRedCubes)
    ) {
      redIsPossible = true;
    } else { redIsPossible = false; }

    if (
      green !== undefined &&
      (green === possibleGreenCubes || green < possibleGreenCubes)
    ) {
      greenIsPossible = true;
    } else { greenIsPossible = false; }

    if (
      blue !== undefined &&
      (blue === possibleBlueCubes || blue < possibleBlueCubes)
    ) {
      blueIsPossible = true;
    } else { blueIsPossible = false; }

    return redIsPossible && greenIsPossible && blueIsPossible;
  });
};

const sumPossibleGamesIds = (gamesInput, possibleRedCubes,
  possibleGreenCubes,
  possibleBlueCubes) => {

    // Process games data
    const gamesData = processInput(gamesInput);

    // Filter possible games
    const possibleGames = filterPossibleGames(gamesData, possibleRedCubes, possibleGreenCubes, possibleBlueCubes);

    // Sum all possible games Ids
    const sumOfIds = possibleGames.reduce((accumulator, game) => {
      return game.id + accumulator;
    }, 0)

    return sumOfIds;
  };

console.log(sumPossibleGamesIds(games, 12, 13, 14));
// Output: 2285;