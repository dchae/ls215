"use strict";

function mergeSort(arr) {
  if (arr.length === 1) return arr;

  let midpoint = Math.floor(arr.length / 2);

  let sorted1 = mergeSort(arr.slice(0, midpoint));
  let sorted2 = mergeSort(arr.slice(midpoint));

  let [i, j] = [0, 0];
  let sorted = [];
  while (i < sorted1.length || j < sorted2.length) {
    if (sorted2[j] === undefined || sorted1[i] < sorted2[j]) {
      sorted.push(sorted1[i]);
      i++;
    } else {
      sorted.push(sorted2[j]);
      j++;
    }
  }

  return sorted;
}

console.log(mergeSort([9, 5, 7, 1])); // [1, 5, 7, 9]
console.log(mergeSort([5, 3])); // [3, 5]
console.log(mergeSort([6, 2, 7, 1, 4])); // [1, 2, 4, 6, 7]
console.log(mergeSort([9, 2, 7, 6, 8, 5, 0, 1])); // [0, 1, 2, 5, 6, 7, 8, 9])

console.log(
  mergeSort(["Sue", "Pete", "Alice", "Tyler", "Rachel", "Kim", "Bonnie"]),
);
// ["Alice", "Bonnie", "Kim", "Pete", "Rachel", "Sue", "Tyler"]

console.log(
  mergeSort([7, 3, 9, 15, 23, 1, 6, 51, 22, 37, 54, 43, 5, 25, 35, 18, 46]),
);
// [1, 3, 5, 6, 7, 9, 15, 18, 22, 23, 25, 35, 37, 43, 46, 51, 54]
