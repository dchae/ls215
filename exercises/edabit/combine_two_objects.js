/*
-- Problem
input: two objects with similar key values
output: one object, with union of keys

rules:
- if both objects share a key, the value in the final object should be the sum

-- Data Structure
2 objects => 1 object


*/
"use strict";

function combine(user1, user2) {
  let combined = {};
  let entries = Object.entries(user1).concat(Object.entries(user2));

  entries.forEach(([key, val]) => {
    combined[key] = (combined[key] || 0) + val;
  });

  return Object.fromEntries(
    Object.entries(combined).sort(([, v1], [, v2]) => v1 - v2),
  );
}

// Examples / Test Cases

let user1 = {
  powerPlant: 70000,
  rental: 12000,
};

let user2 = {
  teaching: 40000,
  rental: 10000,
};

console.log(combine(user1, user2));

user2 = {};
console.log(combine(user1, user2));

user2 = {
  teaching: 0,
  rental: 0,
};

console.log(combine(user1, user2));
// {
//   powerPlant: 70000,
//   teaching: 40000,
//   rental: 22000   // The rental income is added together.
// }
