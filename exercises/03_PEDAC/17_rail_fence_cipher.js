/*
Part 1 - Encoding
-- Problem --
Input: string, number of rails n
Output: string, encoded via the rail fence cipher

Constraints:
- input will always be one string and one integer n
- string length >= 0
- number of rails n > 0
- input string can contain any characters

Requirements:
- Output string should contain only non-space characters
- Output string should be composed of n "rails", concatenated
  -

-- Data Structure --

"012345", 2
=> "012345"
=> "0 2 4"
   " 1 3 5"
=> "024" +
   "135"
   "13524"

"012345", 3
=> "012345"
=> "0   4"
   " 1 3 5"
   "  2"
=> "04" +
   "135" +
   "2"
=> "041352"

"012345", 4
=> "012345"
=> "0"
   " 1   5"
   "  2 4"
   "   3"
=> "0" +
   "15" +
   "24" +
   "3"
=> "015243"

"0123456789abc", 4
=> "0123456789abc"
=> "0     6     c"
   " 1   5 7   b"
   "  2 4   8 a"
   "   3     9"
=> "06c147b248a39"


"WE ARE DISCOVERED FLEE AT ONCE", 3
=> "WEAREDISCOVEREDFLEEATONCE"
=> "W   E   C   R   L   T   E"
   " E R D S O E E F E A O C"
   "  A   I   V   D   E   N"
=> "WECRLTE" +
   "ERDSOEEFEAOC" +
   "AIVDEN"
=> "WECRLTEERDSOEEFEAOCAIVDEN"

String => n arrays of chars => string

// Algorithm
- indices 0...n go to rails 0...n
n = 3
first rail takes every (n + 1)th char
second rail takes every 1 + (n-1)th char
third rail takes every 2 + (n+1)th char

n = 4
first rail takes every char at index i where i % (n*2 - 2) === 0
  for (let i = 0; i < iterable.length; i += n * 2 - 2) {
    rail1.push(iterable);
  }
second rail takes every char at index i where
third rail takes every 2 + (n+1)th char

-- drop this

1. init n rails and j, incrementor
2. iterate through string with index i
  - if j === 0 or rails.length, incrementor *= -1
  - result << string[i]
  - j += incrementor

*/
"use strict";

// function toRails(iterable, n) {
//   let rails = [...new Array(n)].map((_) => []);
//   let incrementor = -1;
//   let j = 0;
//
//   for (let i = 0; i < iterable.length; i++) {
//     let curChar = iterable[i];
//     let curRail = rails[j];
//     curRail.push(curChar);
//
//     if (j === 0 || j === rails.length - 1) incrementor *= -1;
//     j += incrementor;
//   }
//
//   return rails;
// }

function transpose(iter, n) {
  if (n < 2) return [...iter];

  let encrypted = [];

  for (let railIdx = 0; railIdx < n; railIdx++) {
    for (let i = railIdx; i < iter.length; i += n * 2 - 2) {
      encrypted.push(iter[i]);

      let offset = (n - 1 - railIdx) * 2;
      if (railIdx % (n - 1) !== 0 && i + offset < iter.length) {
        encrypted.push(iter[i + offset]);
      }
    }
  }

  return encrypted;
}

function railEncrypt(string, n) {
  string = string.replace(/\s+/g, "");

  let transposed = transpose(string, n);

  return transposed.join("");
}

function railDecrypt(string, n) {
  let indices = [...new Array(string.length).keys()];
  let encryptedIndices = transpose(indices, n);

  let decrypted = encryptedIndices.reduce((res, oldIdx, curIdx) => {
    res[oldIdx] = string[curIdx];
    return res;
  }, []);

  return decrypted.join("");
}

// -- Examples / Test Cases --

const encryptionTests = [
  {
    input: "WE ARE DISCOVERED FLEE AT ONCE",
    n: 3,
    expected: "WECRLTEERDSOEEFEAOCAIVDEN",
  },

  {
    input: "012345",
    n: 2,
    expected: "024135",
  },

  {
    input: "012345",
    n: 3,
    expected: "041352",
  },

  {
    input: "012345",
    n: 4,
    expected: "015243",
  },

  {
    input: "0123456789abc",
    n: 4,
    expected: "06c157b248a39",
  },

  {
    input: "0",
    n: 4,
    expected: "0",
  },

  {
    input: "0",
    n: 1,
    expected: "0",
  },

  {
    input: "",
    n: 1,
    expected: "",
  },

  {
    input: "",
    n: 4,
    expected: "",
  },
];

const decryptionTests = [
  {
    input: "WECRLTEERDSOEEFEAOCAIVDEN",
    n: 3,
    expected: "WEAREDISCOVEREDFLEEATONCE",
  },

  {
    input: "024135",
    n: 2,
    expected: "012345",
  },

  {
    input: "041352",
    n: 3,
    expected: "012345",
  },

  {
    input: "015243",
    n: 4,
    expected: "012345",
  },

  {
    input: "06c157b248a39",
    n: 4,
    expected: "0123456789abc",
  },

  {
    input: "0",
    n: 4,
    expected: "0",
  },

  {
    input: "0",
    n: 1,
    expected: "0",
  },

  {
    input: "",
    n: 1,
    expected: "",
  },

  {
    input: "",
    n: 4,
    expected: "",
  },
];

console.log("\nencryptionTests: ");
encryptionTests.forEach(({ input, n, expected }) => {
  let output = railEncrypt(input, n);
  console.log("input:    " + input + ", ", n);
  console.log("output:   " + output);
  console.log("expected: " + expected);
  console.log(output === expected);
  console.log("-".repeat(10));
});

console.log("\ndecryptionTests: ");
decryptionTests.forEach(({ input, n, expected }) => {
  let output = railDecrypt(input, n);
  console.log("input:    " + input + ", ", n);
  console.log("output:   " + output);
  console.log("expected: " + expected);
  console.log(output === expected);
  console.log("-".repeat(10));
});
