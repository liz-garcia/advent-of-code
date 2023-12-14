import fs from "fs";

const calibrationDocumentPath = "2023/day-1/input.txt";
const lines = fs.readFileSync(calibrationDocumentPath, "utf-8").split("\n");

const sumOfAllCalibrationValues = lines.reduce((accumulator, currentLine) => {
  const firstDigit = parseInt(currentLine.match(/\d/)[0]);
  const lastDigit = parseInt(currentLine.match(/\d(?=\D*$)/)[0]);

  // Calibration value is a single two-digit number:
  // first digit and the last digit (in that order)
  const calibrationValue = (firstDigit * 10) + lastDigit;

  return accumulator + calibrationValue;
}, 0);

console.log(sumOfAllCalibrationValues);
// Output: 55816
