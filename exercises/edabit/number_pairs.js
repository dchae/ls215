"use strict";
/*
Create a function that determines how many number pairs are embedded in a
space-separated string.

The first numeric value in the space-separated string represents the count
of the numbers, thus, excluded in the pairings.

Notes
Always take into consideration the first number in the string is not part
of the pairing, thus, the count.
It may not seem so useful as most people see it, but it's mathematically
significant if you deal with set operations.

Algo
1. remove first digit
2. get tally
3. reduce tally; count => count // 2
*/

function toTally(iter) {
  return iter.reduce(
    (tally, x) => ((tally[x] = (tally[x] ?? 0) + 1), tally),
    {},
  );
}

function numberPairs(str) {
  let numStrs = str.split(" ").slice(1);
  let res = Object.entries(toTally(numStrs)).reduce(
    (acc, [_, count]) => acc + Math.floor(count / 2),
    0,
  );

  return res;
}

// Examples
console.log(numberPairs("7 1 2 1 2 1 3 2") === 2);
// (1, 1), (2, 2)

console.log(numberPairs("9 10 20 20 10 10 30 50 10 20") === 3);
// (10, 10), (20, 20), (10, 10)

console.log(numberPairs("4 2 3 4 1") === 0);
// Although two 4's are present, the first one is discounted.
