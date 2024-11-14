/*
-- Problem --
Input:
- arr => 2D array (square integer matrix)
- x => integer row coordinate
- y => integer column coordinate

Output:
- integer (value of the lowest neighbour, including given coordinate)

Constraints:
Args
- Will always receive one array argument and two integer arguments,
  in that order

Array (grid)
- Will never be empty or sparse
- will always contain only array elements (rows)
- row length will always be equal to grid length
  - i.e., grid will always be a square
- order matters
- do not mutate
- will not have object properties

array (row)
- will never be empty or sparse
- will only contain integer elements
- order matters
- do not mutate
- will not have object properties

integers (cell values)
- will be valid integers
- can be negative or zero
- cannot be NaN or Infinity, etc.

integers (x, y coordinates)
- will always be valid coordinates of the grid

Concepts:
- lowest neighbour:
  - lowest: least value
  - neighbour: a value that has a coordinate (x, y), where x and y are
               each at most 1 away from the target coordinates

Rules:
- return the minimum value in the 3x3 grid surrounding the given coordinates.
- do not mutate input array

-- Data Structure --
2D array
=> flat array
=> integer

=> [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
   ], 0, 0
=> [[1, 2], [4, 5]]
=> [1, 2, 4, 5]
=> 1

-- Algorithm --
1. get all the values that have a coordinate delta <= 1
   with the given coordinates
    - iterate through the rows in startRow..endRow
      - startRow = max(0, x - 1), endRow = min(grid.length, x + 1)
      - iterate through the columns (y - 1..x + 1)
        - startCol = max(0, x - 1), endCol = min(grid.length, x + 1)
2. get the minimum value from that array
3. return min value

*/
"use strict";

function lowestElement(grid, x, y) {
  let neighbours = grid
    .slice(Math.max(0, x - 1), x + 2)
    .flatMap((row) => row.slice(Math.max(0, y - 1), y + 2));
  return Math.min(...neighbours);
}

// -- Examples / Test Cases --
// happy path
console.log(
  lowestElement(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    1,
    1,
  ) === 1,
);

console.log(
  lowestElement(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    0,
    0,
  ) === 1,
);

console.log(
  lowestElement(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    0,
    1,
  ) === 1,
);

console.log(
  lowestElement(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    1,
    0,
  ) === 1,
);

console.log(
  lowestElement(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    1,
    2,
  ) === 2,
);

console.log(
  lowestElement(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    2,
    1,
  ) === 4,
);

console.log(
  lowestElement(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    2,
    2,
  ) === 5,
);

console.log(
  lowestElement(
    [
      [9, 8, 7],
      [0, -1, -3],
      [-5, -9, 54],
    ],
    0,
    0,
  ) === -1,
);

// smaller grids
console.log(
  lowestElement(
    [
      [1, 2],
      [4, 5],
    ],
    1,
    1,
  ) === 1,
);

console.log(lowestElement([[1]], 0, 0) === 1);
