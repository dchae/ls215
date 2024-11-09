/*
-- Problem --
Input:
- Array representing route
  - array contains room numbers (1-4) or string "H"

Output:
- boolean representing whether the route is valid

Constraints:
Args
- Will always receive one argument of type array

Array (route)
- May be empty
- Will not be sparse
- Will not have object properties
- order matters (represents order of rooms taken in the route)
- rooms will not repeat (consecutively)
  - i.e, there will be no cases in which arr[i] === arr[i + 1]


Array elements (rooms)
- can be 1, 2, 3, 4, or "H"


Requirements:
- return undefined for empty array
- return true for length 1 array

- otherwise: return true if
  - for each element in the array:
    - the element is the first element in the array OR
    - the current element is "connected" to the previous element

-- Data Structure --
Array of rooms
=> bool

connections: {1: Set(1) {2}, 2: {1, "H"}, H: {2, 4}, 4: {"H", 3}, 3: {4}}

[1, 2, "H", 4, 3]
[true, true, true, true, true]
=> true

["H", 1, 2]
[false]
=> false

-- Algorithm --
1. return undefined if array is empty
2. create object connections { room: Set(), 2: Set(2) {1, "H"}, ... }
3. check if every element in the array[1..] satisfies
    validMove(connections, lastRoom, curRoom)
4. return true if so, else false

validMove(connections, lastRoom, curRoom)
return true if connections[lastRoom].has(curRoom)
else return false

*/
"use strict";
// Code
function validMove(connections, route, i) {
  let lastRoom = route[i - 1];
  let curRoom = route[i];
  return connections[lastRoom].has(curRoom);
}

function possiblePath(route) {
  if (route.length === 0) return undefined;

  const connections = {
    1: new Set([2]),
    2: new Set([1, "H"]),
    H: new Set([2, 4]),
    4: new Set(["H", 3]),
    3: new Set([4]),
  };

  let indices = [...route.keys()].slice(1);
  return indices.every((i) => validMove(connections, route, i));
}

// -- Examples // Test Cases --
// happy path
console.log(possiblePath([1, 2, "H", 4, 3]) === true);
console.log(possiblePath(["H", 1, 2]) === false);
console.log(possiblePath(["H", 2, 1]) === true);
console.log(possiblePath([4, 3, 4, "H", 4, "H"]) === true);

// empty array
console.log(possiblePath([]) === undefined);

// length 1
console.log(possiblePath([2]) === true);

// length 2
console.log(possiblePath([2, "H"]) === true);
console.log(possiblePath([2, 4]) === false);
