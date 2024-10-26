"use strict";

function myOwnEvery(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    if (!fn(arr[i], i, arr)) return false;
  }

  return true;
}

let isAString = (value) => typeof value === "string";
console.log(myOwnEvery(["a", "a234", "1abc"], isAString)); // true
