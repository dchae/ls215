"use strict";

let min = Infinity;
let getMin = (value) => (min = value <= min ? value : min);

const myForEach = (arr, fn) => {
  for (let i = 0; i < arr.length; i++) {
    fn(arr[i], i, arr);
  }
};

myForEach([4, 5, 12, 23, 3], getMin);
console.log(min); // 3
