"use strict";
/*
-- Problem --
A distinct string is a string that is present only once in an array.

Given an array of strings, arr, and an integer, k,
return the kth distinct string present in arr.
If there are fewer than k distinct strings, return an empty string "".

Note that the result string is the one encountered earliest in the array.

- input: array of strings (arr), integer (k)
- output: kth distinct string or ""
- definitions:
  - "distinct string": present only once in an array
- rules:
  - If array is empty, return ""
  - Will there always be 2 arguments?
    - No, array will always be provided, k may not
  - Can the array be sparse? No
  - Guaranteed to get an array with only strings
  - if k is not provided, default to value of 1
  - if there are no distinct strings, return ""
  - Will k always be a positive integer? No.
  - If k is not a positive integer, return ""
  - Do we treat empty strings differently? No
 */

// -- Examples / Test Cases --

const tests = [
  // generic cases
  { input: [["d", "b", "c", "b", "c", "a"], 2], expected: "a" },
  { input: [["d", "b", "c", "b", "c", "a"], 1], expected: "d" },
  { input: [["d", "b", "c", "b", "c", "d", "a"], 1], expected: "a" },
  { input: [["d", "b", "c", "b", "c", "d"], 2], expected: "" },
  { input: [["d", "d"], 1], expected: "" },
  { input: [["d", "a"], 1], expected: "d" },
  { input: [["d"], 1], expected: "d" },

  // edge cases
  { input: [[], 1], expected: "" },
  { input: [[]], expected: "" },
  { input: [["d", "d", "b", "c", "b", "c", "a"]], expected: "a" },
  { input: [["d", "b", "c", "b", "c", "d"], -1], expected: "" },
  { input: [["d", "b", "c", "b", "c", "d"], 0], expected: "" },
  { input: [["d", "b", "c", "b", "c", "d"], NaN], expected: "" },
  { input: [["d", "b", "c", "b", "c", "d"], Infinity], expected: "" },
  { input: [["d", "b", "c", "b", "c", "d"], 0.8], expected: "" },
  { input: [[""], 1], expected: "" },
  { input: [["", ""], 1], expected: "" },
  { input: [["a", "b", "a", ""], 2], expected: "" },
];

/*
-- Data Structure --
Custom Tally Object {"d": 1, "b": 2, "c": 2, "a": 1}
Array of strings

-- Algorithm --
High-Level
1. Build Tally
2. Get array of distinct strings
3. get kth element (remember k is 1-indexed)
4. return kth element if it exists, else return ""

Detailed
1. Build Tally
Initialise Tally object
For string in arr:
  If string is in tally:
    increment tally[string]
  else:
    initialise tally[string] to 0

2. Get array of distinct strings
Filter tally object entries to get only entries with value === 1
Get keys from filtered entries array

3. get kth element (remember k is 1-indexed)
filtered[k-1]

4. return kth element if it exists, else return ""
*/

// Code

function distinctString(arr, k = 1) {
  const tally = {};
  for (let i = 0; i < arr.length; i++) {
    const str = arr[i];
    tally[str] = (tally[str] ?? 0) + 1;
  }

  const distinctStrings = Object.entries(tally)
    .filter(([str, count]) => count === 1)
    .map(([str, count]) => str);

  return distinctStrings[k - 1] ?? "";
}

tests.forEach((test) => {
  let output = distinctString(...test.input);

  console.log("input: ");
  console.dir(test.input);
  console.log("output: ");
  console.dir(output);
  console.log("expected: ");
  console.dir(test.expected);
  console.log((output === test.expected ? "pass" : "FAIL") + "\n");
});
