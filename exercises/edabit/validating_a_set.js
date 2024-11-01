/*
-- Problem --
input: array of "card" objects
output: boolean

- Return true if the three cards form a "set"
  - three cards form a set if for each property:
    - the number of unique values is not 2 (1 or 3)

rules:
- the properties are fixed
- we will always receive a non-sparse array argument
  consisting of three valid card objects.
- the properties and values will be formatted consistently
  - always lowercase strings or integers (1, 2, 3)

-- Data Structure --
array of objects
=> array of Sets
=> boolean

   [
     { color: "red", number: 1, shade: "empty", shape: "squiggle" },
     { color: "red", number: 2, shade: "lined", shape: "diamond" },
     { color: "red", number: 3, shade: "full", shape: "oval" },
   ]
=> [
     Set("red"),
     Set(1, 2, 3),
     Set("empty", "lined", "full"),
     Set("squiggle", "diamond", "oval"),
   ]


-- Algorithm --
1. Transform the array of objects into an array of sets
2. return false if any of the Sets have size === 2

*/

// -- Code --
"use strict";

// function isSet(cards) {
//   let uniquePropertyGroups = Object.keys(cards[0]).map((property) => {
//     return new Set(cards.map((card) => card[property]));
//   });
//
//   return uniquePropertyGroups.every((group) => group.size !== 2);
// }

function isSet(cards) {
  return !Object.keys(cards[0])
    .map((property) => new Set(cards.map((card) => card[property])).size)
    .includes(2);
}

// -- Examples / Test Cases --

const tests = [
  // happy path
  {
    input: [
      { color: "red", number: 1, shade: "empty", shape: "squiggle" },
      { color: "red", number: 2, shade: "lined", shape: "diamond" },
      { color: "red", number: 3, shade: "full", shape: "oval" },
    ],
    expected: true,
  },
  {
    input: [
      { color: "red", number: 1, shade: "empty", shape: "squiggle" },
      { color: "red", number: 2, shade: "lined", shape: "diamond" },
      { color: "purple", number: 3, shade: "full", shape: "oval" },
    ],
    expected: false,
  },
  {
    input: [
      { color: "green", number: 1, shade: "empty", shape: "squiggle" },
      { color: "green", number: 2, shade: "empty", shape: "diamond" },
      { color: "green", number: 3, shade: "empty", shape: "oval" },
    ],
    expected: true,
  },

  {
    input: [
      { color: "purple", number: 1, shade: "full", shape: "oval" },
      { color: "green", number: 1, shade: "full", shape: "oval" },
      { color: "red", number: 1, shade: "full", shape: "oval" },
    ],
    expected: true,
  },

  {
    input: [
      { color: "purple", number: 3, shade: "full", shape: "oval" },
      { color: "green", number: 1, shade: "full", shape: "oval" },
      { color: "red", number: 3, shade: "full", shape: "oval" },
    ],
    expected: false,
  },
];

tests.forEach((test) => console.log(isSet(test.input) === test.expected));
