"use strict";

const myReduce = function myReduce(arr, fn, initial) {
  let i = 0;

  initial = initial ?? arr[i++];

  while (i < arr.length) {
    initial = fn(initial, arr[i], i, arr);
    i += 1;
  }

  return initial;
};

let smallest = (result, value) => (result <= value ? result : value);
let sum = (result, value) => result + value;

console.log(myReduce([5, 12, 15, 1, 6], smallest)); // 1
console.log(myReduce([5, 12, 15, 1, 6], sum, 10)); // 49
