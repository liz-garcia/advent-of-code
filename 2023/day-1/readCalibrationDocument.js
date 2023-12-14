import fs from "fs";

const calibrationDocumentPath = "2023/day-1/input.txt";
const lines = fs.readFileSync(calibrationDocumentPath, "utf-8").split("\n");

// ! Part One
const sumOfAllCalibrationValues = lines.reduce((accumulator, currentLine) => {
  const firstDigit = parseInt(currentLine.match(/\d/)[0]);
  const lastDigit = parseInt(currentLine.match(/\d(?=\D*$)/)[0]);

  // Calibration value is a single two-digit number:
  // first digit and the last digit (in that order)
  const calibrationValue = (firstDigit * 10) + lastDigit;

  return accumulator + calibrationValue;
}, 0);

// ! Part Two
const sumOfAllRealCalibrationValues = lines.reduce(
  (accumulator, currentLine) => {
    const spelledOutToDigit = {
      "oneight": 18,
      "twone": 21,
      "threeight": 38,
      "fiveight": 58,
      "sevenine": 79,
      "eightwo": 82,
      "eighthree": 83,
      "one": 1,
      "two": 2,
      "three": 3,
      "four": 4,
      "five": 5,
      "six": 6,
      "seven": 7,
      "eight": 8,
      "nine": 9,
    };

    function getRealLine(line) {
      const pattern = new RegExp(Object.keys(spelledOutToDigit).join('|'), 'gi');
      const realLine = line.replace(pattern, match => spelledOutToDigit[match.toLowerCase()]);
      return realLine;
    }

    const realCurrentLine = getRealLine(currentLine);

    // Calibration value is a single two-digit number:
    // first digit and the last digit (in that order)
    const realFirstDigit = parseInt(realCurrentLine.match(/\d/)[0]);
    const realLastDigit = parseInt(realCurrentLine.match(/\d(?=\D*$)/)[0]);
    const realCalibrationValue = (realFirstDigit * 10) + realLastDigit;

    return accumulator + realCalibrationValue;
  },
  0
);

console.log(sumOfAllCalibrationValues);
// Output: 55816

console.log(sumOfAllRealCalibrationValues);
// Output: 54980
