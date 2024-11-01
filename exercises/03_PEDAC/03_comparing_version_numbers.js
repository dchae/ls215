"use strict";

// -- Problem --
// - Input: two strings representing versions numbers (a, b)
// - Output:
//   - if a > b, 1
//   - if a < b, -1
//   - if a === b, 0;
//   - if invalid input(s), null
// - Rules:
//   - Each version number is compared by separating it by periods
//     and comparing the sub-version-numbers mathematically, starting
//     from the left. ?
//   - if one version number has less periods, we treat it
//     as if it has the same number of periods, but with zeros.
//   - if either version number contains illegal characters, return null
//   - legal characters: 0-9, .
//   - What if less than two version numbers are provided?
//     - return null
//   - What if the version number contains only legal characters,
//     but is not valid? e.g. "..1" or "."
//     - return null
//   - What if a version number is empty? ("")
//     - return null
//   - What if more than two version numbers are provided?
//     - ignore extra arguments
//
// -- Examples / Test Cases --
//  0.1 < 1 = 1.0 < 1.1 < 1.2 = 1.2.0.0 < 1.18.2 < 13.37

const tests = [
  // generic casegeneric cases
  { input: ["0.1", "1"], expected: -1 },
  { input: ["1", "0.1"], expected: 1 },
  { input: ["1", "1"], expected: 0 },
  { input: ["1", "1.0"], expected: 0 },
  { input: ["1.0", "1.1"], expected: -1 },
  { input: ["1.2", "1.1"], expected: 1 },
  { input: ["1.2", "1.2.0.0"], expected: 0 },
  { input: ["1.2.0.0", "1.18.2"], expected: -1 },
  { input: ["13.37", "1.18.2"], expected: 1 },
  { input: ["1.0", "1.0.0.1"], expected: -1 },

  // edge cases
  { input: ["00.1", "1"], expected: -1 },
  { input: ["00.1", "0001"], expected: -1 },
  { input: ["001", "1.00.0"], expected: 0 },
  { input: ["1.a", "1.0.0.1"], expected: null },
  { input: ["1", "!1.0.0.1"], expected: null },
  { input: ["1"], expected: null },
  { input: [], expected: null },
  { input: ["1", "."], expected: null },
  { input: ["1", "..1"], expected: null },
  { input: ["1", ".1."], expected: null },
  { input: ["1", "1..0"], expected: null },
  { input: ["1", "1."], expected: null },
  { input: ["", "1"], expected: null },
  { input: ["0.1", "1", "1.18"], expected: -1 },
];

const validationTests = [
  { input: "1", expected: true },
  { input: "1.0", expected: true },
  { input: "1.0.0", expected: true },
  { input: "1.10.0", expected: true },
  { input: "0.0.11", expected: true },
  { input: ".0.11", expected: false },
  { input: "..11", expected: false },
  { input: ".", expected: false },
  { input: "", expected: false },
];

// -- Data Structure --
//  Arrays containing Numbers
//  e.g.:
//  - "1.18.2" => [1, 18, 2]
//
// -- Algorithm --
// - High-level
// 1. Validate inputs with regex
//
// 2. Parse inputs
// For each input string:
//   split string by periods
//   convert string array to integer array
//
// 3. Make arrays same length
// Find smaller array
// Pad the array with 0s until the lengths are equal
//
// 4. Compare arrays
// For each index in arr1: (don't use forEach)
//   compare values at index for each array
//   if one is greater than the other, return 1 or -1
//   else continue
// if iteration completes, return 0
//
// -- Code --
// - starttime = 10:00
//

function validVersionNumber(str) {
  return /^[0-9]+(\.[0-9]+)*$/.test(str);
}

function compareIntArrays(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] < arr2[i]) return -1;
    if (arr1[i] > arr2[i]) return 1;
  }

  return 0;
}

// function compareVersions(version1, version2) {
//   if (!(validVersionNumber(version1) && validVersionNumber(version2))) {
//     return null;
//   }
//
//   const arr1 = version1.split(".").map((char) => parseInt(char, 10));
//   const arr2 = version2.split(".").map((char) => parseInt(char, 10));
//
//   let shorter = arr1;
//   let longer = arr2;
//   if (arr1.length > arr2.length) {
//     shorter = arr2;
//     longer = arr1;
//   }
//
//   while (shorter.length < longer.length) {
//     shorter.push(0);
//   }
//
//   return compareIntArrays(arr1, arr2);
// }
//

// Solution using localecompare (probably not very robust)
function compareVersions(a, b) {
  if (!(validVersionNumber(a) && validVersionNumber(b))) {
    return null;
  }

  [a, b] = [a, b].map((str) => {
    return str
      .split(".")
      .map((char) => String.fromCharCode(Number(char) + 32))
      .join("");
  });

  const maxLength = Math.max(...[a, b].map((str) => str.length));

  a = a.padEnd(maxLength, String.fromCharCode(32));
  b = b.padEnd(maxLength, String.fromCharCode(32));

  return a.localeCompare(b);
}

// validationTests.forEach((test) =>
//   console.log(validVersionNumber(test.input) === test.expected),
// );

tests.forEach((test) => {
  let output = compareVersions(...test.input);
  console.log("input:");
  console.log(test.input);
  console.log("output:");
  console.dir(output);
  console.log("expected:");
  console.dir(test.expected);
  console.log(output === test.expected ? "pass" : "FAIL" + "\n");
});
