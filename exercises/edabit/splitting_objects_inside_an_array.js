/*
-- Problem --
Input: array of objects, where each object represents a fruit and quantity
Output: an array of objects
        - where there is one object for the quantity for each fruit.

Constraints:
- input will always be one array
- input array will never be empty
- input array will never be sparse
- input array will always contain only objects
- fruit objects will always have a string type name and integer quantity > 0
- name values will always be lowercase

- Will there ever be two fruit object elements with the same name? No.

Requirements:
- the returned array should have each fruit in the same order as the input array
- Do not mutate input array
- Can different elements of the output array point to the same object?
  - No

-- Data Structure --
array of fruit objects => array of fruit objects
   [{ name: "grapes", quantity: 2 }],
=> [
     { name: "grapes", quantity: 1 },
     { name: "grapes", quantity: 1 }
   ]

-- Algorithm --
1. flatMap input array
  - for each object fruit:
    return [...new Array(fruit.quantity)].map(_ => new fruit obj )

*/
"use strict";

function splitBunches(arr) {
  return arr.flatMap(({ name, quantity }) =>
    [...new Array(quantity)].map((_) => ({ name, quantity: 1 })),
  );
}

// -- Test Cases --

const tests = [
  [{ name: "grapes", quantity: 2 }],
  // [
  //   { name: "grapes", quantity: 1 },
  //   { name: "grapes", quantity: 1 }
  // ]

  [{ name: "grapes", quantity: 1 }],
  // [
  //   { name: "grapes", quantity: 1 }
  // ]

  [
    { name: "currants", quantity: 1 },
    { name: "grapes", quantity: 2 },
    { name: "bananas", quantity: 2 },
  ],
  // [
  //   { name: "currants", quantity: 1},
  //   { name: "grapes", quantity: 1 },
  //   { name: "grapes", quantity: 1 },
  //   { name: "bananas", quantity: 1 },
  //   { name: "bananas", quantity: 1 }
  // ]
];

tests.forEach((input) => console.log(splitBunches(input)));
