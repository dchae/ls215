"use strict";
/*
-- Problem --
input: 2d array representing a crop field
output: boolean representing whether every crop in the field is hydrated

Constraints:
- will always receive one argument of type array

field array
- will always be a 2d matrix
- will not be sparse
- will not be jagged
- can be empty (0 rows)
- can contain empty arrays

field row values
- can be either "w" or "c", will not be anything else

Rules:
- a crop "c" is hydrated if it is vertically, horizontally,
  or diagonally adjacent to a water source "w"
- a crop (or any cell) is hydrated if the 3x3 square that contains it,
  contains a "w"

- if field is empty, return true
- if field rows have length 0, return true
- if there are no crops, return true

-- Data Structure --
2D array
=> bool
[
  ["w", "c"],
  ["w", "c"],
  ["c", "c"],
]
i j val
0 0 w
0 1 c
1 0 w
1 1 c
2 0 c
2 1 c

-- Algorithm --
1. return true if every c is adjacent to some 'w'
- return true if for every row:
  - for every char, i in row:
     - return true if char == "w"
     - if char == "c"
       - return true if char is adjacent to a "w"

HELPER
isWatered(i, j, field)
- let adjacents = getAdjacentCells(i, j, field)
- return true if adjacents contains "w"

HELPER
getAdjacentCells(i, j, field) // contains the center cell
- init subField to []
- iterate from i - 1 to i + 1 (inclusive)
  - iterate from j - 1 to j + 1 (inclusive)
    - if field[i][j]: add field[i][j] to subField

*/

function getSubField(i, j, field) {
  return field
    .slice(Math.max(0, i - 1), i + 2)
    .flatMap((row) => row.slice(Math.max(0, j - 1), j + 2));
}

// let field = [
//   ["w", "c"],
//   ["w", "c"],
//   ["c", "c"],
// ];
//
// console.log(getSubField(2, 1, field));

function isWatered(i, j, field) {
  let subField = getSubField(i, j, field);
  return subField.includes("w");
}

function cropHydrated(field) {
  return field.every((row, i) => row.every((_, j) => isWatered(i, j, field)));
}

// -- Examples / Test Cases --
// Happy path
console.log(
  cropHydrated([
    ["w", "c"],
    ["w", "c"],
    ["c", "c"],
  ]) === true,
);

console.log(
  cropHydrated([
    ["w", "c"],
    ["c", "c"],
    ["c", "c"],
  ]) === false,
);

console.log(cropHydrated([["c", "c", "c"]]) === false);

console.log(
  cropHydrated([
    ["c", "c", "c", "c"],
    ["w", "c", "c", "c"],
    ["c", "c", "c", "c"],
    ["c", "w", "c", "c"],
  ]) === false,
);

// no crops
console.log(
  cropHydrated([
    ["w", "w"],
    ["w", "w"],
    ["w", "w"],
  ]) === true,
);

// Empty field
console.log(cropHydrated([]) === true);
console.log(cropHydrated([[]]) === true);
console.log(cropHydrated([[], []]) === true);
