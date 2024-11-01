"use strict";
/*
-- Problem --
Input: number in string format
Output: boolean

Rules:
- Exactly one argument will always be provided
- No fractional values, Infinity or NaN


Requirements:
- ignore all non-numeric chars in input string
- should work for all numeric strings with length >= 1
- return false for empty string inputs
  (string inputs with no numeric characters)
- return true if passes the checksum test
- else return false
*/

// Examples / Test Cases
const tests = [
  // general cases
  { input: "1111", expected: false },
  { input: "8763", expected: true },
  { input: "2323 2005 7766 3554", expected: true },
  { input: "32323 2005 7766 3554", expected: false },

  // edge cases
  { input: "", expected: false },
  { input: " ", expected: false },
  { input: "asdf", expected: false },
  { input: "a1111", expected: false },
  { input: "a1-1d1.1>", expected: false },
  { input: "8f7$6f3A", expected: true },
  { input: "-2.323 .20.05 7'76h6 35jk54", expected: true },
];

/*
-- Data Structure --
Array

-- Algorithm --
1. Clean input string
2. return false if cleaned string contains no numeric chars
3. Turn input string into array
4. Get the checksum (getChecksum)
5. Return true if checksum ends in 0 / checksum % 10 === 0
6. Else, return false

Helper function getChecksum(stringArr)
- convert string array to number array
- Reverse arr
- For each element e at index i in arr (map operation):
  if i is odd, double the value of e
  if e is greater than or equal to 10, subtract 9 from e
- Sum all the elements
- return the sum
*/

// 3678 => [3, 12, 7, 16] => [3, 3, 7, 7] => 20 => true
// '' => false
// ' ' => false
// 'asdf' => false

// Code

function getChecksum(arr) {
  let reversed = arr.reverse();

  let mapped = reversed.map((digit, i) => {
    if (i % 2 !== 0) digit *= 2;
    if (digit > 9) digit -= 9;
    return digit;
  });

  let checksum = mapped.reduce((acc, x) => acc + x);

  return checksum;
}

function validLuhn(str) {
  let cleaned = str.replace(/\D/g, "");
  if (cleaned === "") return false;

  let digits = cleaned.split("").map(Number);

  let checksum = getChecksum(digits);
  return checksum % 10 === 0;
}

tests.forEach((test) => {
  let output = validLuhn(test.input);
  console.log("input: ");
  console.dir(test.input);
  console.log("expected: ");
  console.dir(test.expected);
  console.log("output: ");
  console.dir(output);

  if (output === test.expected) {
    console.log("PASS");
  } else {
    console.log("FAIL");
  }
  console.log();
});
