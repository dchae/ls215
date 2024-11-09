/*
-- Problem --
Input: array
Output: sorted tally object

Constraints:
Args
- Will always receive one array argument

Array
- Can contain any element
  - Any primitive, any object
- Can be empty
- Cannot be sparse

Requirements:
- For empty array, return empty object
- For arrays, treat occurences as a repetition if order and values are same
- For object, treat occurences as a repetition if
  - order of keys and their values are same
- returned object should be sorted by value in descending order
  - how is this possible for non-negative integer keys??
    - ignore for non-negative integer keys

*/
"use strict";

function countRepetitions(arr) {
  let tally = arr.reduce(
    (tally, x) => ((tally[x] = (tally[x] ?? 0) + 1), tally),
    {},
  );

  return Object.fromEntries(Object.entries(tally).sort((a, b) => b[1] - a[1]));
}

// Examples / Test Cases
const tests = [
  {
    input: ["cat", "dog", "cat", "cow", "cow", "cow"],
    expected: { cow: 3, cat: 2, dog: 1 },
  },
  {
    input: [1, 5, 5, 5, 12, 12, 0, 0, 0, 0, 0, 0],
    expected: { 0: 6, 5: 3, 12: 2, 1: 1 },
  },
  {
    input: ["Infinity", "null", "Infinity", "null", "null"],
    expected: { null: 3, Infinity: 2 },
  },
  {
    input: ["Infinity", "null", "Infinity", "null", "null", null, null],
    expected: { null: 5, Infinity: 2 }, // ??? WHAT THE FUCK IS THIS QUESTION?
  },
];

tests.forEach(({ input, expected }) => {
  let output = countRepetitions(input);
  console.log("input: ", input);
  console.log("output: ", output);
  console.log("expected: ", expected);
  console.log(JSON.stringify(output) === JSON.stringify(expected));
  console.log("-".repeat(10));
});
