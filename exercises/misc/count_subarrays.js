"use strict";
/*
-- Problem --
input: one 2d array (candidates), one 1d array (target)
output: an integer representing the number of subarrays in the candidates
        array which contain the elements in the target array

rules:
- what does it mean for an array to "contain the elements in the target"?
  - each unique element which occurs n times in the target array
    must exist in the candidate array m times, where m >= n.

  - order does not matter
  - duplicates count

- will always receive 2 arrays
- both arrays may be empty
  - if the candidates array is empty, return null
  - if the target array is empty, it is contained by every array
    - i.e., return length of first argument

- arrays will not be sparse

- subarrays can contain any primitive value
  - except for NaN and Infinity

- are we allowed to mutate the input array? No.

-- Data Structure --
2d array [[1, 2, 3], [2, 3, 4]], target array [1, 2, 3]
- create an object to keep track of values and counts
- need to be able to distinguish between 1 and '1', null and 'null', etc.

1. custom object with generated keys to distinguish type
    (number:1, string:1; object:null, string:null)
2. new Map()

=> tally Map representing each unique value and its count for an array
=> use tallys to compare


-- Algorithm --
1. return null if first arg is empty
2. initialise count to 0, create targetTally
3. iterate through candidates, incrementing count when a
   candidate contains the elements in target
    - create candidateTally
    - if isSubset(candidateTally, targetTally), count++
4. return count

- Helpers
tally(array)
1. init map object
2. iterate through elements of array, increment entry value in map object
3. return map object

isSubset(targetTally, candidateTally)
1. iterate through targetTally and check that every entry is contained
  - for each element, count in targetTally
    - return false unless candidateTally.get(element) >= count
2. return true

*/

// Algorithm

function toTally(array) {
  let tally = new Map();
  for (let element of array) {
    tally.set(element, (tally.get(element) ?? 0) + 1);
  }
  return tally;
}

function isSubset(targetTally, candidateTally) {
  return targetTally
    .entries()
    .every(([element, count]) => candidateTally.get(element) >= count);
}

function countSubsets(candidates, target) {
  if (candidates.length === 0) return null;

  let count = 0;
  let targetTally = toTally(target);

  for (let candidate of candidates) {
    let candidateTally = toTally(candidate);
    if (isSubset(targetTally, candidateTally)) count += 1;
  }

  return count;
}

// Examples / Test Cases
const tests = [
  // happy path
  {
    candidates: [
      [1, 2, 3],
      [2, 3, 4],
    ],
    target: [1, 2, 3],
    expected: 1,
  },
  {
    candidates: [
      [2, 2, 3],
      [2, 3, 4],
    ],
    target: [1, 2, 3],
    expected: 0,
  },
  {
    candidates: [
      [1, 2, 3],
      [1, 2, 2, 3, 3, 4, 5, 6, 6],
    ],
    target: [1, 2, 3],
    expected: 2,
  },

  // string values
  {
    candidates: [
      ["1", 2, 3],
      ["1", "2", "3"],
      [1, 2, 3, 4],
    ],
    target: [1, 2, 3],
    expected: 1,
  },
  {
    candidates: [
      ["1", 2, 3],
      ["1", "2", "3"],
      [1, 2, 3, 4],
    ],
    target: ["1", 2, 3],
    expected: 1,
  },

  // other primitives
  {
    candidates: [
      [null, 0, false, true, "1", undefined, "false"],
      [null, 0, false, true, "1", undefined, false],
      [null, 0, false, true, "1", "undefined", "false"],
      [null, 0, 0, true, "1", undefined, "false"],
    ],
    target: [null, 0, false, true, "1", undefined, "false"],
    expected: 1,
  },

  // empty arguments
  {
    candidates: [],
    target: [1, 2, 3],
    expected: null,
  },
  {
    candidates: [],
    target: [],
    expected: null,
  },
  {
    candidates: [
      [1, 2, 3],
      [2, 3, 4],
    ],
    target: [],
    expected: 2,
  },
];

let mutationTest = {
  candidates: [
    [1, 2, 3],
    [2, 3, 4],
  ],
  target: [1, 2, 3],
  expected: 1,
};

tests.forEach(({ candidates, target, expected }) => {
  let output = countSubsets(candidates, target);
  console.log("candidates: ");
  console.log(candidates);
  console.log("target: ");
  console.log(target);
  console.log("expected: " + expected);
  console.log("output: " + output);

  console.log(output === expected ? "PASS" : "FAIL");
  console.log("----------------------");
});

countSubsets(mutationTest.candidates, mutationTest.target);
console.log(mutationTest.candidates, mutationTest.target);
