/*
-- Problem
input: array of arbitrary dimensionality,
       containing subarrays of type string and array
output: sum of numbers in strings

rules:
- numbers can be negative
- numbers will always be integers

-- Data Structure
ragged n-D array of string values
=> flat array of string values
=> flat array of integer values
=> integer

   ["1", "five2-1", "2-wenty", "t-hr33"]
=> ["1", "2", "-1", "2", "33"]
=> [1, 2, -1, 2, 33]
=> 37

-- Algorithm
1. flatten array
2. map array to extracted numeric string values
3. map array to integers
4. sum array values

*/
"use strict";

function sum(arr) {
  // return (
  //   arr
  //     .toString()
  //     .match(/-?\d+/g)
  //     ?.map(Number)
  //     .reduce((acc, x) => acc + x) ?? 0
  // );

  let numStrings = arr.toString().match(/-?\d+/g) || [];
  let nums = numStrings.map(Number);
  return nums.reduce((acc, x) => acc + x, 0);
}

// -- Examples / Test Cases

const tests = [
  { input: [], expected: 0 },
  { input: [[[[[]]]]], expected: 0 },
  { input: [[[""], [["asdf"]]], [[[[]]]]], expected: 0 },
  { input: [""], expected: 0 },
  { input: ["", "five", "wenty", "thr"], expected: 0 },
  { input: ["1", "five", "2wenty", "thr33"], expected: 36 },
  { input: ["1", "five2-1", "2-wenty", "t-hr33"], expected: 37 },
  {
    input: [
      ["1X2", "t3n"],
      ["1024", "5", "64"],
    ],
    expected: 1099,
  },
  {
    input: [[["1"], "10v3"], ["738h"], [["s0"], ["1mu4ch3"], "-1s0"]],
    expected: 759,
  },
];

tests.forEach((test) => console.log(sum(test.input) === test.expected));
