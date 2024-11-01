/*
-- Problem --
Input: non-negative integer n; 0 <= n <= 10000
Output: integer representing the minimum number of 1s required to express n

Rules:
- n must be represented in an arithmetic expression containing only addition
  and subtraction operations on numbers composed of 1s.
- exactly one argument n is always provided

-- Examples --
- 0 => 1 - 1
- 1 => 1 => 1
- 2 => 1 + 1 => 2
- 6 => 1 + 1 + 1 + 1 + 1 + 1 => 6
- 7 => 11 - 1 - 1 - 1 - 1 => 6
- 11 => 11 => 2
- 13 => 11 + 1 + 1 => 4
- 121 => 111 + 11 - 1 => 6
- 1000 => 1111 - 111 => 7

-- Data Structure --
strings and numbers; '11' => 11

-- Algorithm --
Greedy
return 2 for n === 0;

init largestChunk = '1'
concatenate 1 to largestChunk until Number(largestChunk + '1') > n
init leastWhole = largestChunk + '1'
e.g. for 7, largestChunk = '1', leastWhole = '11'

Find out which path is "cheaper" (costs less '1's)
if n % Number(largestChunk) === 0
  largestChunkCost =
    (n / Number(largestChunk)) * largestChunk.length
else
  largestChunkCost =
    (n // Number(largestChunk)) * largestChunk.length + oneCost(n % Number(largestChunk))

if (Number(leastWhole) - n < n && Number(leastWhole) - n > 0)
leastWholeCost =
  leastWhole.length + oneCost(Number(leastWhole) - n)

e.g.:
- 0
  2

- 1
  largestChunkCost = 1 / 1 * 1 = 1

- 2
  largestChunkCost = 2 / 1 * 1 = 2

- 6
  largestChunkCost = 6 / 1 * 1 = 6
  5 < 6
  leastWholeCost = 2 + oneCost(5) = 2 + 5 = 7
  return 6

- 7
  largestChunkCost = 7 / 1 * 1 = 7
  4 < 7
  leastWholeCost = 2 + oneCost(4) = 2 + 4 = 6

- 11
  largestChunkCost = 11 / 11 * 2 = 1 * 2 = 2

- 13
  largestChunkCost = (13 / 11) * length + oneCost(13 % 11) = 2 + oneCost(2)

- 121
  largestChunkCost = 121 // 111 * 3 + oneCost(10) = 1 * 3 + 3 = 6
  1111 - 121 !< 121

- 1000
  largestChunkCost = 1000 // 111 * 3 + oneCost(1) = 9 * 3 + 1 = 28
  1111 - 1000 < 1000 = 111 < 1000
  4 + oneCost(111) = 4 + 3  7
*/

// -- Code --
"use strict";

const memo = { 0: 2 };
function digitOne(n) {
  if (memo[n]) return memo[n];

  let largestChunk = "1";
  while (Number(largestChunk + "1") <= n) largestChunk += "1";

  let leastWhole = largestChunk + "1";

  let best = Math.floor(n / Number(largestChunk)) * largestChunk.length;
  if (n % Number(largestChunk) !== 0) {
    best += digitOne(n % Number(largestChunk));
  }

  if (Number(leastWhole) - n < n && Number(leastWhole) - n > 0) {
    let leastWholeCost = leastWhole.length + digitOne(Number(leastWhole) - n);
    if (leastWholeCost < best) best = leastWholeCost;
  }

  memo[n] = best;
  return best;
}

// Test Cases

const tests = [
  { input: 0, expected: 2 },
  { input: 1, expected: 1 },
  { input: 2, expected: 2 },
  { input: 3, expected: 3 },
  { input: 6, expected: 6 },
  { input: 7, expected: 6 },
  { input: 10, expected: 3 },
  { input: 11, expected: 2 },
  { input: 13, expected: 4 },
  { input: 121, expected: 6 },
  { input: 1000, expected: 7 },
];

tests.forEach((test) => {
  let output = digitOne(test.input);

  console.log(`input: ${test.input}`);
  console.log(`expected: ${test.expected}`);
  console.log(`output: ${output}`);
  console.log(output === test.expected ? "PASS" : "FAIL");
  console.log("-----------");
});
