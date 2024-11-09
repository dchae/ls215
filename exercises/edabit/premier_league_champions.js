/*
-- Problem --
Input: array of objects representing football clubs
  - each football club object has the properties:
      {name, wins, loss, draws, scored, conceded}
Output: string representing the team name with the highest number of points
  - Break ties by returning the team with the largest goal difference

Constraints:
- Input
  - Argument count => 1
  - Argument type => array

- Input Array
  - Argument length => n >= 0
  - Argument sparsity => no
  - Contained element types => always "football club object"

- Football Club Object
  - properties => always {name, wins, loss, draws, scored, conceded}
    - names of properties always spelled the same
    - value types will always be string for name, otherwise integer

- Output
  - type => string
  - format => same as value for name property of "winning" team object

- Ties will always be breakable by goal difference

Requirements:
- Do not mutate the input array or its objects
- If input array is empty, return undefined

-- Data Structure --
Array of objects => Array of objects => String

[
  {
    name: "Manchester United",
    wins: 30,
    loss: 3,
    draws: 5,
    scored: 88,
    conceded: 20,
  },
  {
    name: "Arsenal",
    wins: 24,
    loss: 6,
    draws: 8,
    scored: 98,
    conceded: 29,
  },
  {
    name: "Chelsea",
    wins: 22,
    loss: 8,
    draws: 8,
    scored: 98,
    conceded: 29,
  },
]

=> [
     {
       name: "Manchester United",
       totalPoints: 3 * wins + draws => 95,
       goalDifference: scored - conceded => 68,
     },
     {
       name: "Arsenal",
       totalPoints: 72 + 8 = 80,
       goalDifference: 98 - 29 => 69,
     },
     {
       name: "Chelsea",
       totalPoints: 66 + 8 = 74,
       goalDifference: 98 - 29 => 69,
     },
   ];

=> "Manchester United"

-- Algorithm --
1. Map input array to teamPoints objects
2. Sort the teamPoints objects by totalPoints, then goalDifference
3. Return last element

-- Code --
*/
"use strict";

function champions(teams) {
  let teamPoints = teams.map(({ name, wins, draws, scored, conceded }) => {
    return {
      name,
      totalPoints: 3 * wins + draws,
      goalDifference: scored - conceded,
    };
  });

  teamPoints.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    } else {
      return b.goalDifference - a.goalDifference;
    }
  });

  return teamPoints[0] && teamPoints[0].name;
}

// -- Test Cases --
let testInput = [
  {
    name: "Manchester United",
    wins: 30,
    loss: 3,
    draws: 5,
    scored: 88,
    conceded: 20,
    // totalPoints: 3 * wins + draws => 95,
    // goalDifference: scored - conceded => 68,
  },
  {
    name: "Arsenal",
    wins: 24,
    loss: 6,
    draws: 8,
    scored: 98,
    conceded: 29,
    // totalPoints: 72 + 8 = 80,
    // goalDifference: 98 - 29 => 69,
  },
  {
    name: "Chelsea",
    wins: 22,
    loss: 8,
    draws: 8,
    scored: 98,
    conceded: 29,
    // totalPoints: 66 + 8 = 74,
    // goalDifference: 98 - 29 => 69,
  },
];

console.log(champions(testInput)); // "Manchester United"

testInput = [
  {
    name: "Manchester United",
    wins: 23,
    loss: 3,
    draws: 11,
    scored: 88,
    conceded: 20,
    // totalPoints: 3 * 23 + 11 => 80,
    // goalDifference: scored - conceded => 68,
  },
  {
    name: "Arsenal",
    wins: 24,
    loss: 6,
    draws: 8,
    scored: 98,
    conceded: 29,
    // totalPoints: 72 + 8 = 80,
    // goalDifference: 98 - 29 => 69,
  },
  {
    name: "Chelsea",
    wins: 22,
    loss: 8,
    draws: 8,
    scored: 98,
    conceded: 29,
    // totalPoints: 66 + 8 = 74,
    // goalDifference: 98 - 29 => 69,
  },
];

console.log(champions(testInput)); // "Arsenal"

testInput = [
  {
    name: "Manchester United",
    wins: 23,
    loss: 3,
    draws: 11,
    scored: 90,
    conceded: 20,
    // totalPoints: 3 * 23 + 11 => 80,
    // goalDifference: 90 - 20 => 70,
  },
  {
    name: "Arsenal",
    wins: 24,
    loss: 6,
    draws: 8,
    scored: 98,
    conceded: 29,
    // totalPoints: 72 + 8 = 80,
    // goalDifference: 98 - 29 => 69,
  },
  {
    name: "Chelsea",
    wins: 22,
    loss: 8,
    draws: 8,
    scored: 98,
    conceded: 29,
    // totalPoints: 66 + 8 = 74,
    // goalDifference: 98 - 29 => 69,
  },
];

console.log(champions(testInput)); // "Manchester United"
console.log(champions([])); // undefined
