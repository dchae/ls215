"use strict";
/*
-- Problem --
Input: object {studentName: scoresArray, ...} where:
      - studentName is a string representing a student name
      - scoresArray is an array of string values representing test scores
Output: array of string values [studentName, ...] where:
      - studentNames are the keys in object for which the scoresArray
        contains only passing scores

Constraints:
- Args
  - Will always receive one argument of type object

- students Object
  - length >= 0
  - will it ever contain other kinds of entries? No.

- student names
  - Will there every be two student names that have
    the same characters with different case? No.
  - Will they ever be an empty string? No.
  - Will they only be alpha chars? Yes

- scores array
  - will it ever be empty? No.
  - will it ever be sparse? No.
  - No object properties

- scores array element
  - will it always be in this fraction format? yes
  - will the first number ever be greater than the second number? No.
  - will the first number ever be less than 0? No.
  - will the second number always be positive? Yes.

- Output array
  - Order alphabetically (lexicographically)
    - "Alex" before "alex", "Chris" before "alex"

Requirements:
- a score string is composed of a score and a total, separated by a fslash
  - a score is passing if the score is equal to the total
  - in other words, if the fraction is equal to 1.

- If object is empty, return empty array
- output array should be sorted in lexicographic order

-- Data Structure --
Object
{
  John: ["5/5", "50/50", "10/10", "10/10"],
  Sarah: ["4/8", "50/57", "7/10", "10/18"],
  Adam: ["8/10", "22/25", "3/5", "5/5"],
  Barry: ["3/3", "20/20"],
}

=> array of keys (unsorted)
["John", "Sarah", "Adam", "Barry"]

=> array of keys (filtered, unsorted)
["John", "Barry"]

=> array of keys (sorted)
["Barry", "John"]

-- Algorithm --
1. turn the input object into an array of keys
2. filter the keys based on whether object[key] contains only passing scores
3. sort the filtered keys
4. return the sorted filtered keys

2. filter Helper function (object, key) => boolean
- init scores to object[key]
- return true if for every score: passingScore(score)

HELPER passingScore(scoreString)
- split scoreString by "/"
- convert both elements to Numbers
- return element1 === element2

*/
function passingScore(scoreString) {
  let [score, total] = scoreString.split("/").map(Number);

  return score === total;
}

// console.log(passingScore("4/5"));
// console.log(passingScore("5/5"));
// console.log(passingScore("0/5"));
// console.log("------");

function containsOnlyPassingScores(scoresObject, key) {
  let scores = scoresObject[key];

  return scores.every(passingScore);
}

function whoPassed(studentScores) {
  let studentNames = Object.keys(studentScores);

  let filtered = studentNames.filter((key) =>
    containsOnlyPassingScores(studentScores, key),
  );

  let sorted = filtered.sort();

  return sorted;
}

// -- Examples / Test Cases --

// Happy path
let output;
output = whoPassed({
  John: ["5/5", "50/50", "10/10", "10/10"],
  Sarah: ["4/8", "50/57", "7/10", "10/18"],
  Adam: ["8/10", "22/25", "3/5", "5/5"],
  Barry: ["3/3", "20/20"],
});

console.log(JSON.stringify(output) === JSON.stringify(["Barry", "John"]));

// all passed
output = whoPassed({
  Zara: ["10/10"],
  Kris: ["30/30"],
  Charlie: ["100/100"],
  Alex: ["1/1"],
});

console.log(
  JSON.stringify(output) ===
    JSON.stringify(["Alex", "Charlie", "Kris", "Zara"]),
);

// no passes
output = whoPassed({
  Zach: ["10/10", "2/4"],
  Fred: ["7/9", "2/3"],
});

console.log(JSON.stringify(output) === JSON.stringify([]));

// sorting lexicographically
output = whoPassed({
  Zara: ["10/10"],
  Kris: ["30/30"],
  Andrew: ["3/3"],
  Andrea: ["4/4", "2/2"],
  AndreA: ["4/4", "2/2"],
  Charlie: ["100/100"],
  Alex: ["1/1"],
});

console.log(
  JSON.stringify(output) ===
    JSON.stringify([
      "Alex",
      "AndreA",
      "Andrea",
      "Andrew",
      "Charlie",
      "Kris",
      "Zara",
    ]),
);

// empty arg
output = whoPassed({});

console.log(JSON.stringify(output) === JSON.stringify([]));

// length 1 arg
output = whoPassed({
  John: ["10/10"],
});

console.log(JSON.stringify(output) === JSON.stringify(["John"]));

// length 1 arg
output = whoPassed({
  John: ["9/10"],
});

console.log(JSON.stringify(output) === JSON.stringify([]));
