"use strict";
/*
[
  [ 1,  2,  _,  4,  5],
  [ 6,  _,  8,  _, 10],
  [ _, 12, 13, 14,  _],
  [16,  _, 18,  _, 20],
  [21, 22,  _, 24, 25]
]
*/

function diamondSum(n) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    // row = i + 1... i + n
    // left index = abs(n // 2 - i)
    // right index = n // 2 + n // 2 - abs(n // 2 - i)

    let left = n * i + Math.abs(Math.floor(n / 2) - i) + 1;
    let right =
      n * i + Math.floor(n / 2) * 2 - Math.abs(Math.floor(n / 2) - i) + 1;

    sum += left;
    if (left !== right) {
      sum += right;
    }
  }
  return sum;
}

console.log(diamondSum(1) === 1);
console.log(diamondSum(3) === 20);
console.log(diamondSum(5) === 104);
