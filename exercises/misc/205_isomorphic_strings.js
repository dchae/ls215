"use strict";
// Given two strings s and t, determine if they are isomorphic.
// Two strings s and t are isomorphic if the characters in s
// can be replaced to get t.

console.log(isIsomorphic("egg", "add") === true);
console.log(isIsomorphic("foo", "bar") === false);

function toKey(str) {
  let tally = [...str].reduce((tally, char, i) => {
    if (!tally.has(char)) tally.set(char, []);
    tally.get(char).push(i);
    return tally;
  }, new Map());

  return JSON.stringify([...tally.values()]);
}

function isIsomorphic(str1, str2) {
  let key1 = toKey(str1);
  let key2 = toKey(str2);

  //   console.log(key1, key2);
  return key1 === key2;
}

// test cases
// All occurrences of a character must be replaced with another character
// while preserving the order of characters.
// No two characters may map to the same character,
// but a character may map to itself.
console.log(isIsomorphic("paper", "title") === true);
console.log(isIsomorphic("parer", "title") === false);
console.log(isIsomorphic("parer", "tiele") === true);
console.log(isIsomorphic("", "") === true);
console.log(isIsomorphic("a", "a") === true);
console.log(isIsomorphic("a", "A") === true);
console.log(isIsomorphic("aA", "Aa") === true);
console.log(isIsomorphic("aA", "AA") === false);
console.log(isIsomorphic("aA ", "aA") === false);
console.log(isIsomorphic("aA", "aA") === true);
console.log(isIsomorphic("bbbaaaba", "aaabbbba") === false);
console.log(isIsomorphic("bbbaaaba", "aaabbbab") === true);
console.log(isIsomorphic("badc", "baba") === false);

console.log(isIsomorphic("s 0$s$", "a01bab") === true);
