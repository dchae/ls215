"use strict";

function binarySearch(arr, target) {
  let [left, right] = [0, arr.length - 1];
  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);

    if (arr[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 8));
