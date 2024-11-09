/*
-- Problem --
Input: - object representing opponent positions
       - integer representing target position

Output: integer representing the position of the closest active opponent

Questions:
- Is the "board" 1-dimensional?
  - i.e., the distance between two positions on the board = abs(x - y)
- What does it mean to be "active"?
  - presumably null means inactive

- Will we always receive exactly two arguments?
- Will the argument types always be object, integer?
- Will the opponents object always contain only string, integer/null
  key, value pairs representing opponent identifier and position?
- What values can the position be besides null and integer?
  - Infinity, -Infinity, NaN, undefined, boolean, object
- What is the range of number of entries we can expect?
  - i.e., can we receive an empty object, and if so
    what should the return value be?

- Will the second argument always be a valid integer?

- What value types can the output be?


Constraints:
- Will always receive two args
- args will always be object, int
- object values will always be null or positive integers
- There will always be at least one active opponent

Requirements:
- return the opponent position that has
  the minimum absolute delta re: the target position
- Break ties by returning the higher position
- If object is empty, return null


-- Data Structure --
opponents: {string: position}
position: null / n (n > 0)

=> position
{
  "Opponent 1": 1,
  "Opponent 2": 15,
  "Opponent 3": 37,
}, 10

let best = best position ?? null

1
15
15

=> 15

-- Algorithm --
1. init best variable to null;
2. iterate through object entries, updating best
  - best = cur position if cur position is closer to target than best position
    - i.e., if abs(target position - cur position) <= abs(target - best)
3. return best

*/
"use strict";
function closer(target, best, cur) {
  if (best === null) return true;

  if (Math.abs(target - cur) === Math.abs(target - best)) return best < cur;

  return Math.abs(target - cur) <= Math.abs(target - best);
}

function findClosestOpponent(opponents, targetPos) {
  let best = null;
  for (let key in opponents) {
    let curPos = opponents[key];

    if (closer(targetPos, best, curPos)) best = curPos;
  }

  return best;
}

// -- Examples / Test Cases --
const tests = [
  // happy path
  {
    input: [
      {
        "Opponent 1": 1,
        "Opponent 2": 15,
        "Opponent 3": 37,
      },
      10,
    ],
    expected: 15,
  },

  {
    input: [
      {
        "Opponent 1": 1,
        "Opponent 2": 15,
        "Opponent 3": 37,
      },
      7,
    ],
    expected: 1,
  },

  {
    input: [
      {
        "Opponent 1": 1,
        "Opponent 2": 15,
        "Opponent 3": 37,
      },
      8,
    ],
    expected: 15,
  },

  {
    input: [
      {
        "Opponent 1": 1,
        "Opponent 2": 15,
        "Opponent 3": 37,
      },
      15,
    ],
    expected: 15,
  },

  {
    input: [
      {
        "Opponent 1": 1,
        "Opponent 2": 15,
        "Opponent 3": 37,
      },
      25,
    ],
    expected: 15,
  },

  {
    input: [
      {
        "Opponent 1": 1,
        "Opponent 2": 15,
        "Opponent 3": 37,
      },
      26,
    ],
    expected: 37,
  },

  {
    input: [
      {
        "Opponent 1": 1,
        "Opponent 2": 15,
        "Opponent 3": 37,
      },
      260,
    ],
    expected: 37,
  },

  // tie
  {
    input: [
      {
        "Opponent 1a": 1,
        "Opponent 1b": 5,
      },
      3,
    ],
    expected: 5,
  },

  {
    input: [
      {
        "Opponent 1b": 5,
        "Opponent 1a": 1,
      },
      3,
    ],
    expected: 5,
  },

  // inactive opponent
  {
    input: [
      {
        "Opponent 1a": 1,
        "Opponent 1b": 5,
        "Opponent 1c": 50,
        "Opponent 1d": 100,
        "Opponent 1e": null,
      },
      150,
    ],
    expected: 100,
  },

  // more inactives
  {
    input: [
      {
        "Opponent 1a": 1,
        "Opponent 1b": null,
        "Opponent 1c": null,
      },
      3,
    ],
    expected: 1,
  },

  // one opponent
  {
    input: [
      {
        "Opponent 1a": 1,
      },
      300,
    ],
    expected: 1,
  },
  {
    input: [
      {
        "Opponent 1a": 1,
      },
      1,
    ],
    expected: 1,
  },
  {
    input: [
      {
        "Opponent 1a": 4,
      },
      1,
    ],
    expected: 4,
  },

  // empty object
  {
    input: [{}, 1],
    expected: null,
  },
];

tests.forEach(({ input, expected }) => {
  let output = findClosestOpponent(...input);
  console.log("input: " + JSON.stringify(input));
  console.log("output: " + output);
  console.log("expected: " + expected);
  console.log(output === expected);
});
