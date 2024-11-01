"use strict";

// -- Problem --
// Input: string representing a set of number in "short-hand" range
// Output: integer array containing all numbers represented by short-hand
//
// Rules:
// - Assume we are always provided with one string argument
// - Assume all numbers are non-negative integers
//
// - Given a string that can be split up into short-hand ranges,
//   extract the ranges and create an array containing all the
//   numbers in those ranges.
// - "short-hand ranges" can have:
//   - no separator, in which case they represent a length 1 range
//   - separators "-", ":", ".."
//     in which case they represent an inclusive range
// - "short-hand ranges" are always increasing
//   - each number (rangeStart, rangeEnd) represents the next number
//     which ends in that number.
// - "range items" (e.g., "1", "1-3", "1:5:2") are always comma separated
// - Will I have to worry about characters that are non-numeric
//   and not in the list of possible separators? No.
// - Will I have to worry about input strings that do not start and end
//   with a number or are otherwise weirdly formatted? No.
// - For empty string input, return empty array

// -- Examples, Test Cases --
const tests = [
  // generic cases
  "1, 3, 7, 2, 4, 1", // 1, 3, 7, 12, 14, 21
  "1-3, 1-2", // 1, 2, 3, 11, 12
  "1..3, 1..2", // 1, 2, 3, 11, 12
  "1:5:2", // 1, 2, 3, 4, 5, 6, ... 12
  "1:5, 6:2", // 1, 2, 3, 4, 5, 6, ... 12
  "104-2", // 104, 105, ... 112
  "04-2", // 104, 105, ... 112
  "104-02", // 104, 105, ... 202
  "545, 64:11", // 545, 564, 565, .. 611

  // edge cases
  "", // []
  "0", // [0]
  "1:5:2:4", // [1, 2, 3, 4, 5, 6, ... 12, 13, 14]
  "1:5-2", // 1, 2, 3, 4, 5, 6, ... 12
  "1:5, 6..2", // 1, 2, 3, 4, 5, 6, ... 12
];

// -- Data Structure --
// string
//   e.g., "1-3, 1-2"
// 2d integer array
//   e.g., [[1, 3], [1, 2]]"
// integer array (output)
//   e.g., [1, 2, 3, 11, 12]

// -- Algorithm --
// 1. Parse the string (split by commas)
// 2. map to an array of consistently formatted range representations
//   - toRangePoints helper function
// 3. Decode the "short-hand" and build output
//   - initialise result array []
//   - initialise cur to min value in ranges
//   - For each range item in array ([rangeStart, rangeEnd])
//     - get range elements with decodeRange
//     - push range elements to result array
// 4. return result array
//
// Helper toRangePoints(str)
//   - single numbers become single element arrays
//     - e.g., 1 => [1]
//   - "separated" ranges are split to become two element integer arrays
//     - e.g., 1-3 => [1, 3]
//     - e.g., 1:5:2 => [1, 5, 2]

// Helper
// decodeRange([rangePoints], cur)
//  - init result array []
//  - curRangePoint = rangePoint[0]
//  - increment cur until cur ends in curRangePoint
//
//  - while rangePoints is not empty
//    - curRangePoint = rangePoint.shift()
//    - while String(cur - 1) does not end in curRangePoint
//      - push cur to result array
//      - increment cur
//
//  - return result array
//
//  1-3 => [1, 2, 3]
//  1:5:2 => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Code

function toRangePoints(rangeString) {
  return rangeString.split(/-|:|\.{2}/);
}

function rangePointMatch(n, rangePoint) {
  let numberEnd = String(n).slice(-rangePoint.length);

  return numberEnd === rangePoint;
}

function decodeRange(rangePoints, cur) {
  let curRangePoint = rangePoints.shift();
  while (!rangePointMatch(cur, curRangePoint)) cur += 1;

  let result = [cur];
  cur += 1;

  while (rangePoints.length > 0) {
    curRangePoint = rangePoints.shift();
    while (!rangePointMatch(cur - 1, curRangePoint)) {
      result.push(cur);
      cur += 1;
    }
  }

  return result;
}

function extractShortHandRanges(rangeString) {
  if (rangeString.length === 0) return [];

  let rangeStrings = rangeString.split(/,\s+/);
  let rangePointArrays = rangeStrings.map(toRangePoints);

  let result = [];
  let cur = 0;

  rangePointArrays.forEach((rangePoints) => {
    let elements = decodeRange(rangePoints, cur);
    cur = elements[elements.length - 1] + 1;
    result.push(...elements);
  });

  return result;
}

tests.forEach((test) => {
  console.dir(extractShortHandRanges(test));
});
