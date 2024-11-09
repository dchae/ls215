/*
-- Problem --
Input: string
Output: new string, with the positions of alpha chars swapped with numerics

Questions:

Args
- Will we always receive one argument of type string?
  - YES

String Arg
- Can string be empty
  - YES, return empty string
- What kinds of characters can the string contain?
  - if more than alpha numeric, how should we treat non-alphanumeric chars?
    - don't swap them
  - Can string contain zero alphanumeric chars? Yes, return as is
  - Can string contain uppercase letters?
    if so, do we treat them differently?
      - Yes and no
- will the numeric characters always be non-negative integers?
  - Yes

Output
- Should the output be different in any way besides
  the positions of the alphanumeric chars?
  - i.e., case, spaces, non-alphanumeric chars
  - No

Requirements:
- The output string should contain all the characters from the input string,
  with the nth alpha char swapped with the nth numeric char
- If the number of alpha chars DNE the number of numeric chars:
  - make k swaps, where k is min(alphasCount, numericsCount)
- If input string is empty, return empty string

-- Examples --

"781a2b3c45"
=> "abc7283145"

-- Data Structure --
String
=> array of chars
=> string

"781a2b3c45"
=> [7, 8, 1, a, 2, b, 3, c, 4, 5]
=> [a, b, c, 7, 2, 8, 3, 1, 4, 5]
=> "abc7283145"

"1a2b3c45"
=> "1a2b3c45"
=> "a1b2c345"

=> "a1b2c345"

-- Algorithm --
1. for each alpha char at index i:
  - swap it with the "next" numeric char at index j
  - can iterate j separately
  - or just keep track of last j and index with limit
2. return swapped string

1. two-pointer iterate swap when num pointer and alpha pointer are "on"

*/

// Code
"use strict";

// function swap(str) {
//   let swapped = [...str];
//   let j = 0;
//   while (!/\d/.test(str[j]) && j < str.length) j++;
//
//   for (let i = 0; i < str.length; i++) {
//     let char = str[i];
//     if (/[a-z]/i.test(char) && j < str.length) {
//       [swapped[i], swapped[j]] = [swapped[j], swapped[i]];
//       do {
//         j++;
//       } while (!/\d/.test(str[j]) && j < str.length);
//     }
//   }
//
//   return swapped.join("");
// }

function isAlphabetic(char) {
  return /[a-z]/i.test(char);
}

function isNumeric(char) {
  return /\d/i.test(char);
}

function swap(str) {
  let alphaIndices = [...str]
    .map((_, i) => i)
    .filter((i) => isAlphabetic(str[i]));

  let numericIndices = [...str]
    .map((_, i) => i)
    .filter((i) => isNumeric(str[i]));

  let limit = Math.min(alphaIndices.length, numericIndices.length);

  let swapped = [...str];
  for (let i = 0; i < limit; i++) {
    let a = alphaIndices[i];
    let b = numericIndices[i];
    [swapped[a], swapped[b]] = [swapped[b], swapped[a]];
  }

  return swapped.join("");
}

// -- Examples / Test Cases --
// happy path
console.log(swap("1a2b3c") === "a1b2c3"); // true

// non-equal counts
console.log(swap("abcd123") === "123dabc"); // true
console.log(swap("1a2b3c45") === "a1b2c345"); // true
console.log(swap("781a2b3c45") === "abc7283145"); // true

// no swaps
console.log(swap("abc") === "abc"); // true
console.log(swap("123") === "123"); // true

// empty arg
console.log(swap("") === ""); // true

// no alphanumeric chars
console.log(swap("!@#$") === "!@#$"); // true

// non-alphanumeric chars
console.log(swap("1!@#$") === "1!@#$"); // true
console.log(swap("!@#$1") === "!@#$1"); // true
console.log(swap("a!@1b23cd#e$4") === "1!@a2bc34#e$d"); // true
console.log(swap("123-4a#b$") === "ab3-41#2$"); // true

// Case
console.log(swap("1a2B3b") === "a1B2b3"); // true
console.log(swap("ab1CD23") === "12a3DbC"); // true
