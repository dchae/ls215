"use strict";
/*
Write a function that displays a four-pointed diamond in an nxn grid,
where n is an odd integer supplied as an argument to the function.
You may assume that the argument will always be an odd integer.

-- Problem --
Input: n (odd integer)
Output: diamond of height x width = n x n, logged to console

Constraints
Args
- Will always receive one argument of type integer

n (int)
- can be 0 or negative
- will always be odd
- will always be an integer
- cannot be NaN, +- Infinity

Rules:
- if n is less than or equal to 0, print empty string
- print n rows of length n, where:
  - cells are either " " or "*"
  - the "*" cells make up a diamond shape
- RETURN UNDEFINED

-- Data Structure --
integer
=> string
=> LOG TO CONSOLE

-- Algorithm --
1. iterate through each row (n rows)
  - print each row i
    - print the number of padding spaces
      - abs(n // 2  - i)
    - print the number of stars
      - (n // 2 - abs(n // 2 - i)) * 2 + 1

*/

// -- Code --

// function diamond(n) {
//   const EMPTY_CELL = " ";
//   const DRAW_CELL = "*";
//
//   if (n < 1) {
//     console.log("");
//     return;
//   }
//
//   for (let i = 0; i < n; i++) {
//     let paddingCount = Math.abs(Math.floor(n / 2) - i);
//     let starCount = (Math.floor(n / 2) - paddingCount) * 2 + 1;
//     let padding = EMPTY_CELL.repeat(paddingCount);
//     let stars = DRAW_CELL.repeat(starCount);
//     console.log(padding + stars);
//   }
// }

function isStar(i, j, n) {
  return (
    Math.abs(Math.floor(n / 2) - i) === j ||
    n - 1 - Math.abs(Math.floor(n / 2) - i) === j
  );
}

function diamond(n) {
  const EMPTY_CELL = " ";
  const DRAW_CELL = "*";

  if (n < 1) {
    console.log("");
    return;
  }

  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      let cell = EMPTY_CELL;
      if (isStar(i, j, n)) {
        cell = DRAW_CELL;
      }
      row.push(cell);
    }

    console.log(row.join(""));
  }
}

// -- Examples / Test Cases --
// Happy path
diamond(1);
// *

diamond(3);
//  *
// ***
//  *

diamond(5);
//   *
//  ***
// *****
//  ***
//   *

diamond(9);
//     *
//    ***
//   *****
//  *******
// *********
//  *******
//   *****
//    ***
//     *

// n = 0
diamond(0);
// ""

// n < 0
diamond(-1);
// ""
diamond(-5);
// ""
