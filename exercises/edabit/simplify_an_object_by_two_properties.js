/*
-- Problem --
Input: array of items (non-unique)
Output: array of unique items, where items have a count property

Constraints:
- you will always be provided with one argument of type array
- The array will never be empty or sparse
- each element will be an object with a brand and name property
  - element objects will have only two properties
  - the order of properties in the objects will always be brand, name
  - object values will never be empty strings
- All duplicates will be displayed in order in the input array

Requirements:
- a "duplicate item" is an items that contains
  the same values for all property names
- The output should contain objects with the keys brand, name, and count,
  in that order.
- The output should be ordered by first occurrence in input array.
- do not modify original input

-- Data Structure --
Array of item objects
=>[
    { brand: "A", name: "1" },
    { brand: "A", name: "1" },
    { brand: "b", name: "two!" },
  ],
Tally object { key: clone of item with count key }
=>{
    '{"brand":"A","name":"1"}': { brand: "A", name: "1", count: 2},
    '{"brand":"b","name":"two!"}': { brand: "b", name: "two!", count; 1 },
  }

values of tally object
=>[
    { brand: "A", name: "1", count: 2 },
    { brand: "b", name: "two!", count: 1 },
  ],

-- Algorithm --
1. Create tally object for items in input array
2. Return tally object's values

HELPER
getTally(array)
- Init tally {}
- for object in array
  - create unique key
  - if tally[key] exists
    - increment count of object at tally[key]
  - else (if we haven't seen this object yet)
    - initialise clone of object with count: 1
    - set value of tally[key] to clone
- return tally

*/
"use strict";

function getKey(item) {
  return JSON.stringify(item);
}

function getTally(objArr) {
  let tally = {};

  for (let item of objArr) {
    let key = getKey(item);
    if (tally[key]) {
      tally[key].count += 1;
    } else {
      tally[key] = Object.assign({}, item);
      tally[key].count = 1;
    }
  }

  return tally;
}

function simplifyList(items) {
  let tally = getTally(items);

  return Object.values(tally);
}

// -- Examples / Test Cases --

const tests = [
  // happy path
  {
    input: [
      { brand: "A", name: "1" },
      { brand: "A", name: "1" },
      { brand: "b", name: "two!" },
    ],
    expected: [
      { brand: "A", name: "1", count: 2 },
      { brand: "b", name: "two!", count: 1 },
    ],
  },

  {
    input: [
      { brand: "NARS", name: "Cosmetics Voyageur Pallete" },
      { brand: "NARS", name: "Cosmetics Voyageur Pallete" },
      { brand: "Urban Decay", name: "Naked Honey Pallete" },
      { brand: "Stila", name: "Stay All Day Liquid Lipstick" },
      { brand: "Stila", name: "Stay All Day Liquid Lipstick" },
      { brand: "Stila", name: "Stay All Day Liquid Lipstick" },
    ],
    expected: [
      { brand: "NARS", name: "Cosmetics Voyageur Pallete", count: 2 },
      { brand: "Urban Decay", name: "Naked Honey Pallete", count: 1 },
      { brand: "Stila", name: "Stay All Day Liquid Lipstick", count: 3 },
    ],
  },

  // test output ordered by occurrence
  {
    input: [
      { brand: "NARS", name: "Cosmetics Voyageur Pallete" },
      { brand: "NARS", name: "Cosmetics Voyageur Pallete" },
      { brand: "Urban Decay", name: "Naked Honey Pallete" },
      { brand: "Stila", name: "Stay All Day Liquid Lipstick" },
      { brand: "Stila", name: "Stay Most Of The Day Lip Balm" },
      { brand: "Stila", name: "Stay All Day Liquid Lipstick" },
    ],
    expected: [
      { brand: "NARS", name: "Cosmetics Voyageur Pallete", count: 2 },
      { brand: "Urban Decay", name: "Naked Honey Pallete", count: 1 },
      { brand: "Stila", name: "Stay All Day Liquid Lipstick", count: 2 },
      { brand: "Stila", name: "Stay Most Of The Day Lip Balm", count: 1 },
    ],
  },

  {
    input: [
      { brand: "NARS", name: "Cosmetics Voyageur Pallete" },
      { brand: "NARS", name: "Cosmetics Voyageur Pallete" },
      { brand: "Urban Decay", name: "Naked Honey Pallete" },
      { brand: "Stila", name: "Stay Most Of The Day Lip Balm" },
      { brand: "Stila", name: "Stay All Day Liquid Lipstick" },
      { brand: "Stila", name: "Stay All Day Liquid Lipstick" },
    ],
    expected: [
      { brand: "NARS", name: "Cosmetics Voyageur Pallete", count: 2 },
      { brand: "Urban Decay", name: "Naked Honey Pallete", count: 1 },
      { brand: "Stila", name: "Stay Most Of The Day Lip Balm", count: 1 },
      { brand: "Stila", name: "Stay All Day Liquid Lipstick", count: 2 },
    ],
  },

  // single element input

  {
    input: [{ brand: "NARS", name: "Cosmetics Voyageur Pallete" }],
    expected: [{ brand: "NARS", name: "Cosmetics Voyageur Pallete", count: 1 }],
  },
];

tests.forEach(({ input, expected }) => {
  let output = simplifyList(input);
  console.log(JSON.stringify(output) === JSON.stringify(expected));
});

let input = [
  { brand: "NARS", name: "Cosmetics Voyageur Pallete" },
  { brand: "NARS", name: "Cosmetics Voyageur Pallete" },
  { brand: "Urban Decay", name: "Naked Honey Pallete" },
  { brand: "Stila", name: "Stay Most Of The Day Lip Balm" },
  { brand: "Stila", name: "Stay All Day Liquid Lipstick" },
  { brand: "Stila", name: "Stay All Day Liquid Lipstick" },
];

// mutation check
let expected = JSON.stringify(input);
simplifyList(input);
console.log(JSON.stringify(input) === expected);
