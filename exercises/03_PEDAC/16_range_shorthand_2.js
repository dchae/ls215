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
  "1, 9-1", // [1, 9, 10, 11]
  "1, 3, 7, 2, 4, 1", // 1, 3, 7, 12, 14, 21
  "1-3, 1-2", // 1, 2, 3, 11, 12
  "1..3, 1..2", // 1, 2, 3, 11, 12
  "1:5:2", // 1, 2, 3, 4, 5, 6, ... 12
  "1:5, 6:2", // 1, 2, 3, 4, 5, 6, ... 12
  "104-2", // 104, 105, ... 112
  "1, 04-2", // 1, 104, 105, ... 112
  "104-02", // 104, 105, ... 202
  "545, 64:11", // 545, 564, 565, .. 611

  // edge cases
  "", // []
  "0", // [0]
  "1:5:2:4", // [1, 2, 3, 4, 5, 6, ... 12, 13, 14]
  "1:5-2", // 1, 2, 3, 4, 5, 6, ... 12
  "1:5, 6..2", // 1, 2, 3, 4, 5, 6, ... 12
  "1:1", // [1, 2, 3, 4, 5, 6, ... 11]
  "1:1:2", // [1, 2, 3, 4, 5, 6, ...11, 12]
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

function parseRanges(str) {
  // return str.split(/,\s+/).map((range) => range.split(/-|:|\.{2}/));
  return (
    str
      .match(/\d+((-|:|\.{2})\d+)*/g)
      ?.map((range) => range.split(/-|:|\.{2}/)) ?? []
  );
}

function expandRange(rangeString) {
  let ranges = parseRanges(rangeString);
  if (ranges.length === 0) return [];

  let cur = parseInt(ranges[0][0], 10);
  let result = [];

  for (let range of ranges) {
    let rangePoint = range[0];
    while (!String(cur).endsWith(rangePoint)) cur += 1;
    result.push(cur++);

    for (let i = 1; i < range.length; i++) {
      rangePoint = range[i];
      while (!String(cur).endsWith(rangePoint)) {
        result.push(cur++);
      }
      result.push(cur++);
    }
  }

  return result;
}

tests.forEach((test) => {
  console.log(expandRange(test));
});
