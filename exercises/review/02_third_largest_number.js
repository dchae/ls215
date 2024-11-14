"use strict";
/*
-- Problem --
Input:
- integer array nums
Output:
- integer representing the third largest number in the array
  - if the third largest number DNE, return largest number

Constraints:
Args
- will always recieve expected number and types of arguments

nums (int array)
- will not be empty or sparse
- will only contain integers (no NaN, INF, fractionals)
- can be length >= 1
- order does not matter
- do not mutate
- no obj props


- Rules
- return the third largest unique number in the array if it exists
  - else, the first largest unique number
- Do not sort the array
- when nums length is < 3, always return the largest number
- duplicate values should be ignored

-- Data Structure --
int array
=> object
=> object keys array
=> string
=> int

int array
=> topThree array
=> int

int array
=> set
=> set - greatest (repeat if needed)
=> int

-- Algorithm --
1. create set from array
2. remove and store greatest element from set in result
3. if set size >= 2, remove and update result twice
4. return result

*/

// Code
function popBest(setObj) {
  let best = Math.max(...setObj);
  setObj.delete(best);

  return best;
}
function thirdMax(arr) {
  let uniques = new Set(arr);

  let best = popBest(uniques);
  if (uniques.size >= 2) {
    for (let i = 0; i < 2; i++) best = popBest(uniques);
  }

  // console.log(best);
  return best;
}

// -- Examples // Test Cases --
// Happy path
console.log(thirdMax([3, 2, 1]) === 1);
console.log(thirdMax([3, 2, 4]) === 2);
console.log(thirdMax([3, 5, 4]) === 3);

// length 1
console.log(thirdMax([1]) === 1);

// length 2
console.log(thirdMax([1, 2]) === 2);
console.log(thirdMax([1, 1]) === 1);

// ties
console.log(thirdMax([1, 1, 1, 1]) === 1);
console.log(thirdMax([1, 1, 1, 1, 2, 2, 2, 2, 2]) === 2);
console.log(thirdMax([1, 2, 3, 3, 4]) === 2);
console.log(thirdMax([1, 2, 3, 3, 4, 4, 4]) === 2);
console.log(thirdMax([1, 2, 3, 3, 4, 4, 4, 5, 5]) === 3);
console.log(thirdMax([1, 1, 2, 2, 2, 2, 3, 3]) === 1);
