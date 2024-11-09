/*
-- Problem --
Input: string argument
Output: object,
- containing first item that has recurred and its first two indices

Requirements:
- if argument is null, undefined, return empty object
- if object is empty or otherwise contains no empty string, return empty object

*/

// -- Code --
"use strict";

function recurIndex(str) {
  let res = {};
  let seen = new Map();

  for (let i = 0; str && i < str.length; i++) {
    let char = str[i];

    if (seen.has(char)) {
      res[char] = [seen.get(char), i];
      break;
    } else {
      seen.set(char, i);
    }
  }

  return res;
}

const tests = [
  { input: "DXTDXTXDTXD", expected: { D: [0, 3] } },

  { input: "YXZXYTUVXWV", expected: { X: [1, 3] } },

  { input: "YZTTZMNERXE", expected: { T: [2, 3] } },

  { input: "AREDCBSDERD", expected: { D: [3, 7] } },

  { input: "", expected: {} },

  { input: null, expected: {} },
];

tests.forEach(({ input, expected }) => {
  let output = recurIndex(input);
  console.log(output);
  console.log(JSON.stringify(output) === JSON.stringify(expected));
});
