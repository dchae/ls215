"use strict";
/*
-- Problem --
input: string representing a sequence of ranges, written in "short-hand"
output: integer array containing all numbers represented by input

breakdown:
- input string contains ranges separated by commas
- ranges can be:
  - single numbers (representing a length 1 range)
  - 2 or more numbers separated by a legal separator
- the first number in the input string represents the starting number
- following numbers in the input string represent the significant digit of
  of their range limit
  - In other words, the first range in the input (rStart-rEnd)
    consists of the numbers:
      [rStart, rStart + 1, rStart + 2, ... rStop],
      where rStop ends in the digits rEnd

requirements:
- Assume exactly one argument will be provided
- Assume argument will always be string type
- Assume no beginning/trailing whitespace or other characters
- Length of argument >= 0
- numbers in the range sequence are always increasing
- the output array contains no duplicates (since numbers are always increasing)
- ranges are always inclusive
- the first number in a range sequence is always a full number
- legal separators: "-", ":", ".."
- no other chars besides 0-9, commas, spaces and legal separators

- return empty array for empty string input
-- Examples / Test Cases
*/

const tests = [
  // generic cases
  { input: "1, 9-1", expected: [1, 9, 10, 11] },
  { input: "1, 3, 7, 2, 4, 1", expected: [1, 3, 7, 12, 14, 21] },
  { input: "1-3, 1-2", expected: [1, 2, 3, 11, 12] },
  { input: "1..3, 1..2", expected: [1, 2, 3, 11, 12] },
  { input: "1:5:2", expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { input: "1:5, 6:2", expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { input: "104-2", expected: [104, 105, 106, 107, 108, 109, 110, 111, 112] },
  {
    input: "1, 04-2",
    expected: [1, 104, 105, 106, 107, 108, 109, 110, 111, 112],
  },
  {
    input: "104-02",
    expected: [
      104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118,
      119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133,
      134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148,
      149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163,
      164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178,
      179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193,
      194, 195, 196, 197, 198, 199, 200, 201, 202,
    ],
  },
  {
    input: "545, 64:11",
    expected: [
      545, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577,
      578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592,
      593, 594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607,
      608, 609, 610, 611,
    ],
  },

  // edge cases
  { input: "", expected: [] },
  { input: "0", expected: [0] },
  {
    input: "1:5:2:4",
    expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  },
  { input: "1:5-2", expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { input: "1:5, 6..2", expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { input: "1:1", expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
  { input: "1:1:2", expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { input: "1, 1, 1", expected: [1, 11, 21] },
];

/*
-- Data Structure --
string => nested array of string arrays => flat integer array
"1, 9-1"
=> [['1'], ['9', '1']]
=> [1, 9, 10, 11]


-- Algorithm --
- key point: range is always increasing
- one-line: count upwards, keeping track of whether we are in a range
            - if we are, add the number to res

1. parse string into nested array ranges
2. while ranges is not empty
  - shift a range
  - shift a "rangepoint" from range
  - increment cur until cur "matches" rangepoint
  - push cur to result array
  - increment cur
  - while range is not empty
    - shift a rangepoint
    - until cur matches checkpoint
      - push cur to result array
      - increment cur
7. return result array

helper - "matches"
String(cur).endsWith(rangePoint)

-- Code --
*/

// function parseRanges(str) {
//   // return str.split(/,\s+/).map((range) => range.split(/-|:|\.{2}/));
//   return (
//     str
//       .match(/\d+((-|:|\.{2})\d+)*/g)
//       ?.map((range) => range.split(/-|:|\.{2}/)) ?? []
//   );
// }
//
// function expandRange(rangeString) {
//   let ranges = parseRanges(rangeString);
//   if (ranges.length === 0) return [];
//
//   let cur = parseInt(ranges[0][0], 10);
//   let result = [];
//
//   for (let range of ranges) {
//     let rangePoint = range[0];
//     while (!String(cur).endsWith(rangePoint)) cur += 1;
//     result.push(cur++);
//
//     for (let i = 1; i < range.length; i++) {
//       rangePoint = range[i];
//       while (!String(cur).endsWith(rangePoint)) {
//         result.push(cur++);
//       }
//       result.push(cur++);
//     }
//   }
//
//   return result;
// }

function expandShorthand(rangeString) {
  // const firstNumStr = rangeString.match(/\d+/) ?? "";
  let cur; // = Number(firstNumStr) + 1;

  // const expanded = rangeString.replace(/(?<!^|\d)\d+/g, (sigDigits) => {
  const expanded = rangeString.replace(/\d+/g, (sigDigits) => {
    cur ??= +sigDigits;
    while (!String(cur).endsWith(sigDigits)) cur += 1;
    return String(cur++);
  });

  return expanded;
}

function expandRange(rangeString) {
  const expanded = expandShorthand(rangeString);
  const strRanges = expanded.match(/[^, ]+/g) ?? [];
  const ranges = strRanges.map((str) =>
    [str.match(/\d+/), str.match(/\d+$/)].map(Number),
  );

  return ranges.flatMap(([start, end]) => {
    return [...new Array(end - start + 1)].map((_, i) => i + start);
  });
}

tests.forEach(({ input, expected }) => {
  let output = expandRange(input);
  console.log("input: " + input);
  console.log("output:   " + JSON.stringify(output));
  console.log("expected: " + JSON.stringify(expected));
  console.log(JSON.stringify(output) === JSON.stringify(expected));
  console.log("-".repeat(10));
});
