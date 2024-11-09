"use strict";
/*
-- Problem --
Input: object
output: object with only the entries where value.marks is unique
- break ties by age (keep older)
*/

function getObject(obj) {
  let seen = new Set();
  let entries = Object.entries(obj); // sort by age?

  let filtered = entries.filter(([key, { marks }]) => {
    let isDuplicate = seen.has(marks);
    seen.add(marks);
    return !isDuplicate;
  });

  let res = Object.fromEntries(
    Object.entries(filtered).map(([i, [_, v]]) => [i, v]),
  );
  return res;
}

console.log(
  getObject({
    0: { age: 18, name: "john", marks: "400" },
    1: { age: 17, name: "julie", marks: "400" },
    2: { age: 16, name: "Robin", marks: "200" },
    3: { age: 16, name: "Bella", marks: "300" },
  }),
);

// {
//   "0": { age: 18, name: "john", marks: "400" },
//   "1": { age: 16, name: "Robin", marks: "200" },
//   "2": { age: 16, name: "Bella", marks: "300" }
// }

console.log(
  getObject({
    0: { age: 18, name: "john", marks: "400" },
    1: { age: 17, name: "julie", marks: "400" },
    2: { age: 16, name: "Robin", marks: "200" },
    3: { age: 16, name: "Bella", marks: "300" },
    4: { age: 16, name: "john", marks: "250" },
    5: { age: 15, name: "julie", marks: "250" },
  }),
);

// {
//   0: {age: 18, name: 'john', marks: '400'},
//   1: {age: 16, name: 'Robin', marks: '200'},
//   2: {age: 16, name: 'Bella', marks: '300'},
//   3: {age: 16, name: 'john', marks: '250'}
// }
