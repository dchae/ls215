"use strict";
/*
-- Problem --
Input: integer n representing a bank of switches from 1..n (inclusive)
Output: integer array representing the 1-indexed switch numbers for
        the switches that remain on after n "passes"

Constraints:
Args
- will always receive exactly one integer argument

n (non-negative Integer)
- n >= 0
- n will always be an integer
- n cannot be NaN, +-Infinity

Rules:
- "pass"

- if n === 0, return an empty array

-- Data Structure --
integer
=> [false, false, false, false, false] (bool arr representing light bank state)
=> [i, j, k...] (int array representing indices of "on" lights after all passes)
=> [x, y, z...] (int array representing ids of "on" lights after all passes)
=> integer array (lights that are on at the end)

n = 5
[0, 0, 0, 0, 0]
[1, 1, 1, 1, 1] (pass 1)
[1, 0, 1, 0, 1] (pass 2)
[1, 0, 0, 0, 1] (pass 3)
[1, 0, 0, 1, 1] (pass 4)
[1, 0, 0, 1, 0] (pass 4)
=> [0, 3] (indices of "on" lights)
=> [1, 4] (identifiers of "on" lights)

1: 1
2: 1, 2
3: 1, 3
4: 1, 2, 4
5: 1, 5
6: 1, 2, 3, 6
7: 1, 7
8: 1, 2, 4, 8
9: 1, 3, 9

-- Algorithm --
1. initialise bool array representing light bank
2. for each index in the bank, make a pass (mutating the bank array)
4. get the indices of all true values in bank
5. return those indices + 1

helper
makePass(bankArr, startIdx)
- for every inclusive multiple of startIdx, i:
  - set bankArr[i] to !bankArr[i]

*/

// -- Code --
function makePass(bankArr, startIdx) {
  for (let i = startIdx; i < bankArr.length; i += startIdx + 1) {
    bankArr[i] = !bankArr[i];
  }
}

// function lightsOn(n) {
//   let bankArr = new Array(n).fill(false);
//   for (let i = 0; i < n; i++) {
//     makePass(bankArr, i);
//   }
//   let onLights = Object.entries(bankArr)
//     .filter(([i, light]) => light)
//     .map(([i, _]) => Number(i) + 1);
//
//   return onLights;
// }

function lightsOn(n) {
  let res = [];
  for (let i = 1; i ** 2 <= n; i++) {
    res.push(i ** 2);
  }
  return res;
}

// -- Examples // Test Cases --

console.log(JSON.stringify(lightsOn(5)) === JSON.stringify([1, 4]));
// Detailed result of each round for `5` lights
// Round 1: all lights are on
// Round 2: lights 2 and 4 are now off;     1, 3, and 5 are on
// Round 3: lights 2, 3, and 4 are now off; 1 and 5 are on
// Round 4: lights 2 and 3 are now off;     1, 4, and 5 are on
// Round 5: lights 2, 3, and 5 are now off; 1 and 4 are on

console.log(
  JSON.stringify(lightsOn(100)) ===
    JSON.stringify([1, 4, 9, 16, 25, 36, 49, 64, 81, 100]),
);

// n = 1
console.log(JSON.stringify(lightsOn(1)) === JSON.stringify([1]));

console.log(JSON.stringify(lightsOn(2)) === JSON.stringify([1]));

console.log(JSON.stringify(lightsOn(3)) === JSON.stringify([1]));

console.log(JSON.stringify(lightsOn(4)) === JSON.stringify([1, 4]));

// zero
console.log(JSON.stringify(lightsOn(0)) === JSON.stringify([]));
