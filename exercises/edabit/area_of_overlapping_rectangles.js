/*
-- Problem --
input: two rectangles represented as arrays containing two "point" objects
      - each "point" object contains an x and y coordinate
      - the two "point" objects represent opposite corners of the rectangle
output: the area of overlap between the two rectangles

rules:
- will always receive two arrays of the expected format
- numbers will always be integers
  - can be negative, 0, or positive
- rectangles may not overlap

- the points will always be bottom-left, top-right

-- Data Structure --
arrays with point objects
=> array with point objects (overlapping rectangle)
=> area

   [{ x: 2, y: 1 }, { x: 5, y: 5 }],
   [{ x: 3, y: 2 }, { x: 5, y: 7 }]
=> [{ x: 3, y: 2 }, { x: 5, y: 5 }],
=> (5 - 3) * (5 - 2)
=> 2 * 3
=> 6


   [{ x: 1, y: 1 }, { x: 3, y: 3 }],
   [{ x: 4, y: 4 }, { x: 6, y: 6 }]
=> [{ x: 4, y: 4 }, { x: 3, y: 3}]

-- Algorithm --
1. Create overlapping rectangle array
2. calculate its area

*/
"use strict";

function overlappingRectangles(rect1, rect2) {
  let res = 0;

  for (let col = rect1[0].y; col < rect1[1].y; col++) {
    for (let row = rect1[0].x; row < rect1[1].x; row++) {
      if (
        rect2[0].y <= col &&
        col < rect2[1].y &&
        rect2[0].x <= row &&
        row < rect2[1].x
      ) {
        res += 1;
      }
    }
  }
  return res;
}

// -- Examples / Test Cases --
const tests = [
  {
    input: [
      [
        { x: 2, y: 1 },
        { x: 5, y: 5 },
      ],
      [
        { x: 3, y: 2 },
        { x: 5, y: 7 },
      ],
    ],
    expected: 6,
  },

  {
    input: [
      [
        { x: 2, y: -9 },
        { x: 13, y: -4 },
      ],
      [
        { x: 5, y: -11 },
        { x: 7, y: -2 },
      ],
    ],
    expected: 10,
  },

  {
    input: [
      [
        { x: -8, y: -7 },
        { x: -4, y: 0 },
      ],
      [
        { x: -5, y: -9 },
        { x: -1, y: -2 },
      ],
    ],
    expected: 5,
  },

  // no overlap case
  {
    input: [
      [
        { x: -8, y: -7 },
        { x: -5, y: 0 },
      ],
      [
        { x: -5, y: -9 },
        { x: -1, y: -2 },
      ],
    ],
    expected: 0,
  },

  {
    input: [
      [
        { x: 1, y: 1 },
        { x: 3, y: 3 },
      ],
      [
        { x: 4, y: 4 },
        { x: 6, y: 6 },
      ],
    ],
    expected: 0,
  },
];

tests.forEach((test) => console.log(overlappingRectangles(...test.input)));
