"use strict";

function isAllUnique(str) {
  const seen = new Set();

  return str
    .match(/\S/gi)
    .every((c) => ((c = c.toLowerCase()), !seen.has(c) && seen.add(c)));
}

console.log(isAllUnique("The quick brown fox jumped over a lazy dog")); // false
console.log(isAllUnique("123,456,789")); // false
console.log(isAllUnique("The big apple")); // false
console.log(isAllUnique("The big apPlE")); // false
console.log(isAllUnique("!@#$%^&*()")); // true
console.log(isAllUnique("abcdefghijklmnopqrstuvwxyz")); // true
