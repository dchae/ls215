/*
-- Problem --
Input: array of student objects
Output: tally object for all notes in input

Rules:
- Will always receive exactly one array argument
- Argument will contain n student objects; 0 <= n
- each student object will always contain a "notes" property (always lowercase)
  - the value of the notes property will always be an integer array
  - the notes array will have length m; 0 <= m
- None of the arrays will be sparse
- The input array will only contain objects
- The notes arrays will only contain integers

Requirements:
- only valid notes should be counted in the tally (1, 2, 3, 4, 5)
- how should the output object be ordered, if at all?
  - actually, js objects order non-negative integer-like keys
    in increasing order, so we have no choice here
- If the input array is empty, return an empty object
- If a notes array is empty, just treat it as having no valid notes

-- Data Structure --
array of objects
=> tally object

  [
    {
      name: "Steve",
      notes: [5, 5, 3, -1, 6],
    },
    {
      name: "John",
      notes: [3, 2, 5, 0, -3],
    },
  ],

=> [5, 5, 3, -1, 6, 3, 2, 5, 0, -3]
=> { 5: 3, 3: 2, 2: 1 }


-- Algorithm --
1. flatmap the input array to the values in the notes property arrays
2. iterate through the allNotes array and update tally object for valid notes
3. return tally object

*/
"use strict";

// -- Code --
function getNotesDistribution(students) {
  const validNotes = new Set([1, 2, 3, 4, 5]);
  let tally = {};
  let allNotes = students.flatMap((student) => student.notes);

  allNotes.forEach((noteVal) => {
    if (validNotes.has(noteVal)) {
      tally[noteVal] = (tally[noteVal] ?? 0) + 1;
    }
  });

  return tally;
}

// -- Examples / Test Cases --
const tests = [
  [
    {
      name: "Steve",
      notes: [5, 5, 3, -1, 6],
    },
    {
      name: "John",
      notes: [3, 2, 5, 0, -3],
    },
  ],
  // {
  //   5: 3,
  //   3: 2,
  //   2: 1,
  // }

  // length 3; notes array with no valid notes
  [
    {
      name: "Steve",
      notes: [5, 5, 3, -1, 6, 2],
    },
    {
      name: "John",
      notes: [3, 2, 5, 0, -3, 2],
    },
    {
      name: "Dan",
      notes: [-1, -1, 6, 0, -3, 9],
    },
  ],
  // {
  //   5: 3,
  //   3: 2,
  //   2: 3,
  // }

  // empty argument
  [], // => {}

  // length 1 argument
  [{ name: "Steve", notes: [1, 2, 2, -1, 3] }], // => { 1: 1, 2: 2, 3: 1 }

  // empty notes
  [{ name: "Steve", notes: [] }], // => {}
];

tests.forEach((studentArray) =>
  console.log(getNotesDistribution(studentArray)),
);
