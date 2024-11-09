// Create a function that returns the count of almost palindromes from a list of words. An almost palidrome is a word whose letters can be rearranged to form a palindrome.
/*
-- Problem --
Input: array of strings
Output: Integer representing the count of "almost palindromes" in the array

Constraints:
- Will always receive one argument of type array
- Array length >= 0;
- Array is never sparse,
- Array will not have object properties
- Array elements will always be strings
  - strings will have length >= 1;
  - strings can contain letters, numbers, special characters
    - no spaces

Rules:
- return the number of almost-palindromes
  - a string is an almost-palindrome if it can be rearranged to form a palindrome
  - the tally of the string contains at most one entry with an odd count

- Empty array returns 0;
- strings are case insensitive
  - 'Ana' is an almost palindrome
- palindromes must have length > 1;

-- Example --
['ana', 'break', 'carrace'],
'ana'
'carrace'

-- Data Structure --
String Array:
   String
=> cleaned lowercase string
=> tally of alpha chars
=> boolean

==> Integer

['11dfd1', '@#$$#@@dAd']
'11dfd1' => {d: 2, f: 1} => true
'@#$$#@@dAd' => {d: 2, a: 1} => true

-- Algorithm --
1. Filter the array for almost-palindromes
2. return the length of the array

HELPER
almostPalindromic(str)
1. lowercase the string
2. remove non-alpha chars
3. return false if the string now has length <= 1
4. create a tally of letters
5. filter tally entries, by value parity
6. return length of filtered <= 1

tally

*/
"use strict";

function getTally(str) {
  let tally = {};
  for (let char of str) {
    tally[char] = (tally[char] ?? 0) + 1;
  }
  return tally;
}

// console.log(tally("carrace"))

function almostPalindromic(str) {
  str = str.toLowerCase();
  str = str.replace(/[^a-z]/g, "");
  if (str.length <= 1) return false;

  let tally = getTally(str);
  let filtered = Object.entries(tally).filter(([k, v]) => v % 2 !== 0);
  return filtered.length < 2;
}

function countAlmostPalindromes(strArray) {
  let filtered = strArray.filter(almostPalindromic);
  return filtered.length;
}

// -- Test Cases --
const tests = [
  // happy path
  { input: ["ana", "break", "carrace"], expected: 2 },
  { input: ["anna", "break", "eecarrace"], expected: 2 },
  { input: ["ananah", "break", "eecarrace"], expected: 1 },
  { input: ["Ana", "break"], expected: 1 },
  { input: ["a", "break"], expected: 0 },
  { input: ["aa", "break"], expected: 1 },
  { input: ["1", "break"], expected: 0 },
  { input: ["11", "break"], expected: 0 },
  { input: ["11aa", "break"], expected: 1 },
  { input: ["111", "break"], expected: 0 },
  { input: ["10121", "break"], expected: 0 },
  { input: ["111", "@#$$#@@"], expected: 0 },
  { input: ["11dfd1", "@#$$#@@dAd"], expected: 2 },

  // edge cases
  // empty input array
  { input: [], expected: 0 },
];

tests.forEach(({ input, expected }) => {
  let output = countAlmostPalindromes(input);
  console.log("input: " + input);
  console.log("input: " + output);

  console.log(output === expected);
});

console.log(countAlmostPalindromes(["coattac", "break", "aaa"]) === 2);
console.log(countAlmostPalindromes(["a", "aa", "aaa"]) === 2);
console.log(countAlmostPalindromes(["a", "break", "Derek"]) === 0);
console.log(countAlmostPalindromes(["Derek", "Mom", "Papa"]) === 2);
console.log(countAlmostPalindromes(["@ana", "break", "carrace8"]) === 2);
console.log(countAlmostPalindromes([]) === 0);

// Start 9:01
// DS: 9:18
// Alg: 9:23
// Code: 9:29
// End: 9:37
