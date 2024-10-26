"use strict";

function staggeredCase(str) {
  return str
    .split("")
    .map((c, i) => (i % 2 ? c.toLowerCase() : c.toUpperCase()))
    .join("");
}

console.log(staggeredCase("I Love Launch School!")); // "I LoVe lAuNcH ScHoOl!"
console.log(staggeredCase("ALL_CAPS")); // "AlL_CaPs"
console.log(staggeredCase("ignore 77 the 4444 numbers")); // "IgNoRe 77 ThE 4444 nUmBeRs"
