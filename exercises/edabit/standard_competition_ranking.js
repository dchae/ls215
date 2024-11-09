/*
-- Problem --
Input: object containing names and scores, string representing a name (key)
Output: return the rank of that competitor according to 1224 ranking

Constraints:
input: scoresObj, nameStr
- will always receive the correct number and types of arguments
- scoresObj.length === 5
- nameStr.length > 0
- score (scoresObj[name]) will always be a non-negative int
- nameStr will always be a property name of scoresObj
- property names will always be alphabetical

Requirements:
- Return the rank of nameStr after ranking entries according to 1224 ranking.

- when all scores are equal, return 1


-- Data Structure --
Object {name: score, ...}
=> array of [name, ranks]
=> {name: ranking}
=> int (ranking)

input: { George: 96, Emily: 96, Susan: 93, Jane: 89, Brett: 82 }
=> [[George, 96], [Emily, 96], [Susan, 93], [Jane, 89], [Brett, 82]]
    - reverse sort by score
=> [[George, 1], [Emily, 1], [Susan, 3], [Jane, 4], [Brett, 5]]
=> { George: 1, Emily: 1, Susan: 3, Jane: 4, Brett: 5 }
    - rank is i + 1 UNLESS arr[i] === arr[i-1]

-- Algorithm --
1. Get entries from input object
2. Sort entries by score
3. create ranks object
4. Look up input name in ranks object and return rank


HELPER createRanks(sortedEntries)
- init ranks obj
- for each entry ([name, score], i)
  - if (the current score is equal to the last score),
    - set rank[name] to last rank
  - else
    - set rank[name] to i + 1

*/
// -- Code --
"use strict";

function createRanks(sortedEntries) {
  let ranks = {};
  sortedEntries.forEach(([name, score], i) => {
    let prevEntry = sortedEntries[i - 1] ?? [];
    if (score === prevEntry[1]) {
      ranks[name] = ranks[prevEntry[0]];
    } else {
      ranks[name] = i + 1;
    }
  });

  return ranks;
}

function competitionRank(scoresObj, nameStr) {
  let entries = Object.entries(scoresObj);
  let sortedEntries = entries.sort((a, b) => b[1] - a[1]);
  let ranks = createRanks(sortedEntries);

  return ranks[nameStr];
}

// -- Examples / Test Cases --

const tests = [
  // happy path
  {
    input: [
      {
        Jane: 89,
        George: 96,
        Susan: 93,
        Emily: 95,
        Brett: 82,
      },
      "Jane",
    ],
    expected: 4,
  },

  {
    input: [
      {
        George: 96,
        Emily: 95,
        Susan: 93,
        Jane: 89,
        Brett: 82,
      },
      "George",
    ],
    expected: 1,
  },

  {
    input: [
      {
        George: 96,
        Emily: 96,
        Susan: 93,
        Jane: 89,
        Brett: 82,
      },
      "George",
    ],
    expected: 1,
  },

  {
    input: [
      {
        George: 96,
        Emily: 96,
        Susan: 93,
        Jane: 89,
        Brett: 82,
      },
      "Susan",
    ],
    expected: 3,
  },

  {
    input: [
      {
        Kate: 92,
        Carol: 92,
        Jess: 87,
        Bruce: 87,
        Scott: 84,
      },
      "Bruce",
    ],
    expected: 3,
  },

  {
    input: [
      {
        Scott: 84,
        Carol: 92,
        Jess: 92,
        Bruce: 87,
        Kate: 92,
      },
      "Bruce",
    ],
    expected: 4,
  },

  {
    input: [
      {
        Kate: 92,
        Carol: 92,
        Jess: 92,
        Bruce: 92,
        Scott: 84,
      },
      "Scott",
    ],
    expected: 5,
  },

  {
    input: [
      {
        Kate: 92,
        Carol: 92,
        Jess: 92,
        Bruce: 92,
        Scott: 92,
      },
      "Scott",
    ],
    expected: 1,
  },
];

tests.forEach(({ input, expected }) => {
  let output = competitionRank(...input);
  let passed = output === expected;
  console.log(passed);

  if (!passed) {
    console.log("input:" + JSON.stringify(input));
    console.log("output: " + output);
    console.log("expected: " + expected);
  }
});
