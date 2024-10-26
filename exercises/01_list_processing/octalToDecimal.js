"use strict";

// function octalToDecimal(str) {
//   let total = 0;
//   for (let i = 0; i < str.length; i++) {
//     let curDigit = Number(str[str.length - 1 - i]);
//     total += curDigit * 8 ** i;
//   }
//
//   return total;
// }

function octalToDecimal(str) {
  return [...str]
    .reverse()
    .map((c, i) => +c * 8 ** i)
    .reduce((a, b) => a + b);
}

console.log(octalToDecimal("1")); // 1
console.log(octalToDecimal("10")); // 8
console.log(octalToDecimal("130")); // 88
console.log(octalToDecimal("17")); // 15
console.log(octalToDecimal("2047")); // 1063
console.log(octalToDecimal("011")); // 9
