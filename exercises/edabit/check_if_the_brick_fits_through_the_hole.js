/*
-- Problem --
Input: 5 integers a, b, c, w, h
  - where a, b, c represent the dimensions of a brick
  - and w, h represent the dimensions of a hole
Output: boolean (true if the brick will fit into the hole)

Constraints:
Args
- Will always receive 5 arguments of type number

dimensions
- Can be integers or fractionals (decimals)
  - Will not be NaN or Infinity
- Will always be positive

Output
- are there any cases where we do not return a boolean value? No.

Requirements:
- return true if
  - for every hole dimension:
   - there exists at least 1 unique brick dimension of equal or lesser size

-- Data Structure --
brickDimensions Array, holeDimensions Array

[1, 2, 1], [1, 1]
holeDimensions[0] (1), brickDimensions[0] (1)
holeDimensions[1] (1), brickDimensions[2] (1)
=> true

[1, 2, 2], [1, 1]
holeDimensions[0] (1), brickDimensions[0] (1)
holeDimensions[1] (1), brickDimensions[-1] (no pair)
=> false

-- Algorithm --

1. collect arguments into two arrays (holeDimensions, brickDimensions)
2. sort both arrays
3. for i in range(0..1)
  - return false if holeDimensions[i] < brickDimensions[i]
4. else return true;

*/
"use strict";

function doesBrickFit(a, b, c, w, h) {
  let holeDimensions = [w, h].sort((a, b) => a - b); // [1, 1]
  let brickDimensions = [a, b, c].sort((a, b) => a - b); // [1, 2, 2]
  for (let i = 0; i < 2; i++) {
    if (holeDimensions[i] < brickDimensions[i]) return false;
  }
  return true;
}

// -- Examples / Test Cases --

// Happy path
console.log(doesBrickFit(1, 1, 1, 1, 1) === true);
console.log(doesBrickFit(1, 2, 1, 1, 1) === true);
console.log(doesBrickFit(1, 2, 2, 1, 1) === false);
console.log(doesBrickFit(2, 2, 2, 1, 1) === false);
console.log(doesBrickFit(1, 2, 2, 2, 1) === true);

// bigger hole
console.log(doesBrickFit(1, 2, 2, 10, 10) === true);

// thin brick
console.log(doesBrickFit(10, 2, 2, 10, 10) === true);
console.log(doesBrickFit(11, 2, 2, 10, 10) === true);
console.log(doesBrickFit(11, 10, 2, 10, 10) === true);
console.log(doesBrickFit(11, 11, 2, 10, 10) === false);
