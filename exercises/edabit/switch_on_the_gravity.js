"use strict";
/*
-- Problem --
input: 2d array representing the starting position of some blocks
output: 2d array representing the ending position after applying gravity

Constraints:
args
- will always receive one array argument

input array
- cannot be empty
- cannot be sparse
- will only contain elements of type array
- will not be jagged
- do not mutate the input array

array elements (rows)
- cannot be empty
- cannot be sparse
- will only contain string elements
- do not mutate

string row elements (cells)
- can be "-" or "#"
- cannot be empty
- will always have length 1

Rules:
- "block": "#"
- cell without a block: "-"
- "applying gravity"
  - means all blocks are moved to the end (bottom) of their columns

- if only one element (i.e., 1 row grid)
  - output array should be the same as the input array

-- Data Structure --
2D array
=> [number of blocks in column 0, ...]

=> 2D array

   [
     ["-", "#", "#", "-"],
     ["-", "-", "#", "-"],
     ["-", "-", "-", "-"],
   ]
=> [0, 1, 2, 0]
=> [
     ["-", "-", "-"],
     ["-", "-", "#"],
     ["-", "#", "#"],
     ["-", "-", "-"],
   ]
=> [
     ["-", "-", "-", "-"],
     ["-", "-", "#", "-"],
     ["-", "#", "#", "-"],
   ]

-- Algorithm --
1. read the input array and create an
   array of the counts of blocks in each column
2. turn the array of column counts into the output array
  - turn columnCounts into a nested Array
  - transpose nested array to create output array

HELPERS
getColumnCounts(grid)
- init res
- for each row i of grid
  - for each cell[i][j]
    - if cell has a block
      - increment res[j]
- return res

toColumns(columnCounts)
map columnCounts to split padded string

transposeGrid(grid)
- initialise 2d array transposed with length grid[0].length
- for row i in the grid
  - for cell at grid[i][j]
    - transposed[j][i]

*/

// -- Code --

const BLOCK_CHAR = "#";
const EMPTY_CHAR = "-";

function getColumnCounts(grid) {
  let res = new Array(grid[0].length).fill(0);
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === BLOCK_CHAR) res[j] = (res[j] ?? 0) + 1;
    });
  });

  return res;
}

function toColumns(columnCounts, rowCount) {
  let columns = columnCounts.map((blockCount) =>
    BLOCK_CHAR.repeat(blockCount).padStart(rowCount, EMPTY_CHAR).split(""),
  );

  return columns;
}

function transposeGrid(grid) {
  let transposed = [...new Array(grid[0].length)];
  transposed = transposed.map((row) => []);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      transposed[j][i] = grid[i][j];
    }
  }

  return transposed;
}

function switchGravityOn(grid) {
  let columnCounts = getColumnCounts(grid);

  let paddedColumns = toColumns(columnCounts, grid.length);
  let transposed = transposeGrid(paddedColumns);

  return transposed;
}

// -- Examples / Test Cases --
const tests = [
  {
    input: [
      ["-", "#", "#", "-"],
      ["-", "-", "-", "-"],
      ["-", "-", "-", "-"],
      ["-", "-", "-", "-"],
    ],
    expected: [
      ["-", "-", "-", "-"],
      ["-", "-", "-", "-"],
      ["-", "-", "-", "-"],
      ["-", "#", "#", "-"],
    ],
  },

  {
    input: [
      ["-", "#", "#", "-"],
      ["-", "-", "#", "-"],
      ["-", "-", "-", "-"],
    ],
    expected: [
      ["-", "-", "-", "-"],
      ["-", "-", "#", "-"],
      ["-", "#", "#", "-"],
    ],
  },

  {
    input: [
      ["-", "#", "#", "#", "#", "-"],
      ["#", "-", "-", "#", "#", "-"],
      ["-", "#", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-", "-"],
    ],
    expected: [
      ["-", "-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-", "-"],
      ["-", "#", "-", "#", "#", "-"],
      ["#", "#", "#", "#", "#", "-"],
    ],
  },

  // single row grid
  {
    input: [["-", "#", "#", "-"]],
    expected: [["-", "#", "#", "-"]],
  },

  // all empty
  {
    input: [
      ["-", "-", "-", "-"],
      ["-", "-", "-", "-"],
      ["-", "-", "-", "-"],
    ],
    expected: [
      ["-", "-", "-", "-"],
      ["-", "-", "-", "-"],
      ["-", "-", "-", "-"],
    ],
  },

  // all full
  {
    input: [
      ["#", "#", "#", "#"],
      ["#", "#", "#", "#"],
      ["#", "#", "#", "#"],
    ],
    expected: [
      ["#", "#", "#", "#"],
      ["#", "#", "#", "#"],
      ["#", "#", "#", "#"],
    ],
  },
];

let mutationTest = [
  ["-", "#", "#", "-"],
  ["-", "-", "#", "-"],
  ["-", "-", "-", "-"],
];
let expected = JSON.stringify(mutationTest);

switchGravityOn(mutationTest);
console.log(JSON.stringify(mutationTest) === expected);

tests.forEach(({ input, expected }) => {
  let output = JSON.stringify(switchGravityOn(input));
  console.log(output === JSON.stringify(expected));
});
