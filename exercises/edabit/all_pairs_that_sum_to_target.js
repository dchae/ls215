"use strict";

function allPairs(arr, target) {
  let res = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] + arr[i] === target) res.push([arr[i], arr[j]].sort());
    }
  }

  return res.sort((pair1, pair2) => pair1[0] - pair2[0]);
}
