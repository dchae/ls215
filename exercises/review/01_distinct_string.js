"use strict";
/*
-- Problem --
Input:
- array of strings arr
- integer k
Output:
- string representing the kth "distinct string" in arr

Constraints:
Args
- Will always receive the expected number and types of arguments (arr, int)

arr (arr)
- can be empty
- cannot be sparse
- will only contain string elements
- can contain duplicates
- order affects return value
- do not mutate
- no object properties

string (arr elements)
- can be empty (treat normally)
- can contain alphas, digits, special chars
- case: treat as different chars

k (integer)
- represents 1-indexed ordinal
  - i.e., there is no 0th k
- will always be a positive integer
- can be greater than array length

Concepts
- distinct string
  - a string for which its value does not occur anywhere else in the array

Rules
- if empty, return empty string

-- Data Structure --
string array, integer
tally using map (instead of object, to preserve insertion order)
filtered array of values
=> string

["d", "b", "c", "b", "c", "a"], 2
Map {d: 1, b: 2, c: 2, a: 1}
['d', 'a'][k - 1]
=> "a"

-- Algorithm --
1. iterate through the array and create a tally with map
2. create an array of distinctStrings
  - filter the values of the tally for count == 1
3. return the value at index k-1 if it exists
4. else, return an empty string

HELPER
toTally(iter)
create tally object
iterate through iterable
  - if tally already has key
    - increment value
  - else set value to 1
return tally object

*/

// Code
function toTally(iter) {
  return iter.reduce((tally, element) => {
    tally.set(element, (tally.get(element) ?? 0) + 1);
    return tally;
  }, new Map());
}

function distinctString(arr, k) {
  let tally = toTally(arr);

  let distinctStrings = [...tally.keys()].filter((key) => tally.get(key) === 1);
  return distinctStrings[k - 1] ?? "";
}

// -- Examples / Test Cases --
// happy path
console.log(distinctString(["d", "b", "c", "b", "c", "a"], 2) === "a");
console.log(distinctString(["d", "b", "c", "b", "c", "a"], 1) === "d");

console.log(
  distinctString(["hello", "hi", "aloha", "hi", "Hello", "hi"], 1) === "hello",
);
console.log(
  distinctString(["hello", "hi", "aloha", "hi", "Hello", "hi"], 2) === "aloha",
);
console.log(
  distinctString(["hello", "hi", "aloha", "hi", "Hello", "hi"], 3) === "Hello",
);

// order
console.log(distinctString(["a", "b", "c", "b", "c", "d"], 2) === "d");

// caps
console.log(distinctString(["d", "b", "c", "b", "D", "c", "a"], 2) === "D");

// nums & special chars
console.log(distinctString(["1", "@", "#", "", "@"], 2) === "#");
console.log(distinctString(["1", "@", "#", "", "@"], 3) === "");
console.log(distinctString(["1", "@", "#", "", "@", ""], 3) === "");
console.log(distinctString(["1", "@", "#", "", "@", "2", ""], 3) === "2");

// no answer
console.log(distinctString(["d", "b", "c", "b", "c", "a"], 3) === "");
console.log(distinctString(["d", "b", "c", "b", "c", "a"], 7) === "");

// empty arr
console.log(distinctString([], 2) === "");

// length 1 arr
console.log(distinctString(["a"], 1) === "a");
console.log(distinctString(["a"], 2) === "");
