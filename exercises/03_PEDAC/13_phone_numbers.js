"use strict";
/*
-- Problem --
Input:
- string representing a phone number
Output:
- Return a 10 digit string of numbers

Rules:
- If number has less than 10 digits, assume it is bad
- If the number has 10 digits, assume it is good
- If the number has 11 digits and the first number is 1,
  use the last 10 digits
- If the number has 11 digits and the first number is not 1,
  assume it is bad.
- If the number has more than 11 digits, assume it is bad.

- For bad numbers, return a string of 10 0s
- For "good" numbers, return a length 10 string containing digits
- Assume exactly one string argument will always be provided.
- Assume digits are always base 10
- Ignore non-numeric characters
*/

// -- Examples / Test Cases --
const tests = [
  // general cases
  { input: "0123456789", expected: "0123456789" },
  { input: "012-345-6789", expected: "0123456789" },
  { input: "012.345.6789", expected: "0123456789" },
  { input: "(012)345-6789", expected: "0123456789" },
  { input: "(012) 345 6789", expected: "0123456789" },
  { input: "012 345 6789", expected: "0123456789" },
  { input: "123456789", expected: "0000000000" },
  { input: "0", expected: "0000000000" },
  { input: ".", expected: "0000000000" },
  { input: "12345678999", expected: "2345678999" },
  { input: "123-4567-8999", expected: "2345678999" },
  { input: "+1 (234)-567-8999", expected: "2345678999" },
  { input: "02345678999", expected: "0000000000" },
  { input: "0000000000000000", expected: "0000000000" },

  // edge cases
  { input: "0s1f2d3f4a5d6f78d9a", expected: "0123456789" },
  { input: "", expected: "0000000000" },
];

/*
-- Data Structures --
- Just strings

-- Algorithm --
1. Clean up the input string by removing non-numeric characters
2. If the string is 11 digits, try to trim leading "1"
3. If the string is more or less than 10 digits, return "0000000000"
4. else, return string.
*/

// -- Code --
function parsePhoneNumber(str) {
  let digits = str.replace(/[^0-9]/g, "");
  if (digits.length === 11) digits = digits.replace(/^1/, "");
  if (digits.length !== 10) digits = "0000000000";

  return digits;
}

tests.forEach((test) => {
  let output = parsePhoneNumber(test.input);
  console.log("input: ");
  console.dir(test.input);
  console.log("output: ");
  console.dir(output);
  console.log(output === test.expected ? "PASS" : "FAIL");
  console.log();
});
