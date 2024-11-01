"use strict";
/*
PART 2

Write a function that can add a check digit to make the
number valid per the Luhn formula and return the original number
plus that digit.

This should give "2323 2005 7766 3554" in response to
"2323 2005 7766 355".

-- Problem --
Input: number in string format
Output: numeric string

- Requirements
- retain formatting (non-numeric characters in) original string
- Assume no zero-length inputs
- Assume always one argument
- if input is already valid, return original string
*/

// Examples / Test Cases
const tests = [
  // general cases
  { input: "1111", expected: "11114" },
  { input: "8763", expected: "8763" }, // 6 + 6 + 14-9 + 8 => 12 + 5 + 8 = 25
  { input: "87630", expected: "876300" }, // 0*2 + 3 + 6*2 + 7 + 8*2 => 0 + 3 + 3 + 7 + 7 => 20
  { input: "2323 2005 7766 355", expected: "2323 2005 7766 3554" },
  { input: "232320057766355", expected: "2323200577663554" },
  { input: "23-23f200d57f7s66f3d55", expected: "23-23f200d57f7s66f3d554" },
  { input: "2323 2005 7766 3554", expected: "2323 2005 7766 3554" },
];

/*
-- Data Structure --
Array

-- Algorithm --
1. Extract integer array from input string
2. Get off-by-one checksum from integer array
3. Get the check digit
  - The number we add to the checksum to make it divisible by 10
  - (10 - (checksum % 10)) % 10
3. Return input string concatenated with check digit

Helper function getChecksum(stringArr)
- convert string array to number array
- Reverse arr
- For each element e at index i in arr (map operation):
  if i is odd, double the value of e
  if e is greater than or equal to 10, subtract 9 from e
- Sum all the elements
- return the sum
*/

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

function Luhn(str) {
  let digits = str.match(/\d/g).map(Number);

  if (getChecksum(digits) % 10 === 0) return str;

  digits.push(0);

  let checkDigit = (10 - (getChecksum(digits) % 10)) % 10;
  return str + String(checkDigit);
}

tests.forEach((test) => {
  let output = Luhn(test.input);
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
