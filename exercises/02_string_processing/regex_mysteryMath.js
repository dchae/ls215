"use strict";

function mysteryMath(str) {
  return str.replace(/[+\-*/]/, "?");
}

console.log(mysteryMath("4 + 3 - 5 = 2"));
// '4 ? 3 - 5 = 2'

console.log(mysteryMath("(4 * 3 + 2) / 7 - 1 = 1"));
// '(4 ? 3 + 2) / 7 - 1 = 1'
