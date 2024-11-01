/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
/*
-- Problem --
input: sorted integer array that has been rotated at pivot index k, target int
output: boolean (whether target exists in nums)

rules:
- decrease the operation steps as much as possible
    - likely means we will have to use binary search
- 1 <= nums.length <= 5000
- -10^4 <= nums[i] <= 10^4
- -10^4 <= target <= 10^4
- nums will always be rotated
    - but pivot can be 0, which is equivalent to no rotation

-- Examples --
[2, 5, 6, 0, 0, 1, 2], 0
=> true

[2, 5, 6, 0, 0, 1, 2], 3
=> false

-- Data Structure --
Rotated array => Un-rotated array => boolean
   [2, 5, 6, 0, 0, 1, 2], 0
=> [0, 0, 1, 2, 2, 5, 6]
=> true

-- Algorithm --
1. Un-rotate input array
    - find pivot point k
    - create un-rotated array by concatenating slices around k
2. Search for target
    - binary search
3. Return true if found, else false

1.a Find pivot point k
binary search
init left and right to 0, nums.length - 1
while left < right
  init mid
  if (mid > nums[0])
    left = mid + 1
  else
    right = mid
return left

-- Code --
*/
"use strict";

// var unrotate = function (nums) {
//   let left = 0;
//   let right = nums.length - 1;
//
//   while (left < right) {
//     let mid = left + Math.floor((right - left) / 2);
//
//     if (nums[mid] === nums[right]) {
//       right -= 1;
//     } else if (nums[mid] < nums[right]) {
//       right = mid;
//     } else {
//       left = mid + 1;
//     }
//   }
//
//   let k = left;
//
//   // console.log("pivot = " + nums[k] + " at " + k);
//   return nums.slice(k).concat(nums.slice(0, k));
// };

var unrotate = function (nums) {
  let i = 0;
  while (i < nums.length) {
    if (nums.at(i - 1) > nums[i]) {
      break;
    }
    i += 1;
  }

  return nums.slice(i).concat(nums.slice(0, i));
};
var search = function (nums, target) {
  let unrotated = unrotate(nums);

  let left = 0;
  let right = unrotated.length - 1;

  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);
    if (unrotated[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return unrotated[left] === target;
};

console.log(
  search([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1], 2),
);
console.log(search([1, 0, 1, 1, 1], 0));
console.log(search([1, 1, 1, 1, 1, 0], 0));
console.log(search([1, 1, 1, 1, 0, 1], 0));
console.log(search([0, 1, 1, 1, 1, 1], 0));
console.log(search([2, 2, 5, 6, 0, 0, 1], 0));
console.log(search([0, 0, 1, 2, 2, 5, 6], 0));
console.log(search([0, 0, 1, 2, 2, 5, 6], 1));
console.log(search([0, 0, 1, 2, 2, 5, 6], 2));
console.log(search([0, 0, 1, 2, 2, 5, 6], 5));
console.log(search([0, 0, 1, 2, 2, 5, 6], 6));
console.log(search([0, 0, 1, 2, 2, 5, 6], 7));
console.log(search([0, 0, 1, 2, 2, 5, 6], 3));
console.log(search([0, 0, 1, 2, 2, 5, 6], -1));
console.log(search([1, 0, 1, 1, 1], 2));
console.log(search([1, 1, 1, 1, 1], 2));
