"use strict";
/*
-- Problem --
- Input: integer array nums
- Output:
  - return the third largest number in nums
  - if the third largest number doesn't exist, return the largest.
- Rules:
  - You are not allowed to sort the array.

  - Are we allowed to use sort at all?
    - No.
  - What are the bounds for the number of elements in nums?
    - 0 <= n <= 2^32-1
  - What should the function return for an empty array?
    - undefined
  - For nums with length < 3, return the greatest number?
    - Yes
  - Will we always receive one argument?
    - Yes
  - Will the argument always be an array?
    - Yes
  - What should the function return for ties:
    (e.g. [1, 2, 2, 3] or [2, 2, 2, 5])?
    i.e., Are we counting duplicate values in our "third"?
    - We return the third largest number, not the third largest element.
    - e.g. [1, 2, 2, 3] => 1
    - [2, 2, 2, 5] => 5 (since there are only two numbers)
  - Will the input array ever be sparse?
    If so, how should we treat empty slots?
    - No
  - Will input array always contain only integers?
    - Yes

*/

const tests = [
  { input: [3, 2, 1], expected: 1 },
  { input: [4, 3, 2, 1], expected: 2 },
  { input: [1, 2, 3, 4], expected: 2 },
  { input: [-1, -2, -3, -4], expected: -3 },
  { input: [-1, -1, -1], expected: -1 },
  { input: [-1, -1, -1, 0], expected: 0 },
  { input: [4, 3, 12, 1], expected: 3 },
  { input: [], expected: undefined },
  { input: [1], expected: 1 },
  { input: [0], expected: 0 },
  { input: [0, 0], expected: 0 },
  { input: [4, 4, 4], expected: 4 },
  { input: [4, 4, 4, 5], expected: 5 },
  { input: [1, 2, 2, 3], expected: 1 },
];

function sortedInsert(x, arr) {
  for (let i = 0; i < Math.min(3, arr.length + 1); i++) {
    if (arr[i] === x) break;

    if (arr[i] === undefined && !(arr[i - 1] <= x)) {
      arr[i] = x;
      break;
    }

    if (arr[i] < x) {
      arr.splice(i, 0, x);
      if (arr.length > 3) arr.pop();
      break;
    }
  }

  return arr;
}

function thirdMax(arr) {
  const topThree = [];
  for (let x of arr) {
    sortedInsert(x, topThree);
  }

  if (topThree.length > 2) {
    return topThree[2];
  } else {
    return topThree[0];
  }
}

tests.forEach((test) => {
  let output = thirdMax(test.input);
  // console.log("input: ");
  // console.dir(test.input);
  // console.log("output: ");
  // console.dir(output);
  // console.log("expected: ");
  // console.dir(test.expected);
  console.log(output === test.expected);
});
