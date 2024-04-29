import fs from "fs";

const puzzleInputPath = "2023/day-2/puzzleInput.txt";
const puzzleInputArray = fs.readFileSync(puzzleInputPath, "utf-8").split("\n");

/* Which games would have been possible if the bag contained (in total) only `12 red, 13 green, 14 blue`. That is:

    --> Evaluate each GAME to determine if its SUBSETS accomplish the following conditions:
    - per SUBSET, Red values are always 12 or less.
    - per SUBSET, Green values are always 13 or less.
    - per SUBSET, Blue values are always 14 or less.
    - Total cubes per SUBSET are always 39 or less (?) (in case there's randomly an extra color in any subset?)

    --> Consider:
    - Each GAME includes its ID in its name, like: Game 11.
    - SUBSETS are 1 or more per GAME.
    - SUBSETS are separated by semi-colons ;
    - SUBSETS may return all 3 colors  or less colors. (or none?). Not always every color exists within the SUBSET.
    - Final Answer will be equivalent to the SUM of the IDs of all POSSIBLE games.
*/

//const filterPossibleGames
// First: turn each GAME String into an Object with key-value pairs for 'id' and 'subsets'; 'subsets' property should be an array from the string of comma-separated values.

//Game 1: 4 green, 7 blue; 2 blue, 4 red; 5 blue, 2 green, 2 red; 1 green, 3 red, 9 blue; 3 green, 9 blue; 7 green, 2 blue, 2 red

// To split and trim strings depending on a character represented by splitParam.
const stringToArray = (string, splitParam) => {
  return string.split(splitParam).map((item) => item.trim());
};

const stringsToArrays = (strings, splitParam) => {
    return strings.map((string) => {
        return stringToArray(string, splitParam);
    });
}

// For arrays that already have only 2 elements/items.
const arrayToObject = (array, keyIndex, valueIndex) => {
  const key = array[keyIndex];
  const value = array[valueIndex];

  const object = {
    [key]: value,
  };

  return object;
};

// Turn a String into an Array and then into an Object
const stringToObject = (string, splitParam, keyIndex, valueIndex) => {
  const array = stringToArray(string, splitParam);
  const object = arrayToObject(array, keyIndex, valueIndex);
  return object;
};

const stringsToObjects = (strings, splitParam, keyIndex, valueIndex) => {
  return strings.map((string) => {
    return stringToObject(string, splitParam, keyIndex, valueIndex);
  });
};

// Extract the name of an specific 'key' in an Object.
// To extract values knowing only the key index use: Object.values(objectElement)[index];
const extractKeyName = (object, index) => {
  const keyName = Object.keys(object)[index];
  return keyName;
};

// Extract integer Number from String
const extractNumber = (string) => {
  const numberString = string.replace(/\D/g, "");
  const number = parseInt(numberString);
  return number;
};

// Process each gameObject so that it has 6 properties: id, name, subsets, red, green, blue. --- Initial gameObject looks like this: { 'Game 1' : '4 green, 7 blue; 2 blue, 4 red; 5 blue, 2 green, 2 red; 1 green, 3 red, 9 blue; 3 green, 9 blue; 7 green, 2 blue, 2 red' }
const processGameObject = (gameObject) => {
  const gameName = extractKeyName(gameObject, 0);
  const gameId = extractNumber(gameName);
  const subsets = gameObject[gameName];
  const subsetsStrings = stringToArray(subsets, ";");
  const subsetsArrays = stringsToArrays(subsetsStrings, ",");
  const processedSubsetsArrays = subsetsArrays.map((array) => 
    {
        return array.map((string) => {
            return stringToArray(string, ",");
        });
    });
//   const subsetsObjects
  
//   const processedSubsets = (arrays) => {
//     return arrays.map((array) => {
//         return stringToArray(subset, ",");
//     });
//   }

// stringToArray.forEach((item, index, arr) => {
//     arr[index] = item.trim();
//   });


//   console.log(subsetsStrings);
//   console.log(subsetsArrays);
// console.log(processedSubsets(subsetsArrays));
console.log(processedSubsetsArrays);

  // Process SUBSETS Array of Strings to Objects
//   const processedSubsets = (subsetsStrings) => {
//     return stringsToArrays(subsetsStrings, ", ");

//     const key = array[keyIndex];
//     const value = array[valueIndex];

//     const object = {
//     [key]: value,
//   };

//   return object;
//   }

  const newObject = {
    id: gameId,
    name: gameName,
    subsets: processedSubsetsArrays,
  };

  return newObject;
};

const processGameObjects = (gameObjects) => {
  return gameObjects.map((gameObject) => processGameObject(gameObject));
};

// Process Games Array of strings
const processGamesArray = (gamesArray) => {
  const toObjects = stringsToObjects(gamesArray, ":", 0, 1);
  const toProcessedObjects = processGameObjects(toObjects);

  return toProcessedObjects;
};

// console.log(stringsToObjects(puzzleInputArray));
console.log(processGamesArray(puzzleInputArray));
