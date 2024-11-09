"use strict";
// Given two strings s and t, determine if they are isomorphic.
// Two strings s and t are isomorphic if the characters in s
// can be replaced to get t.

console.log(isIsomorphic("egg", "add") === true);
console.log(isIsomorphic("foo", "bar") === false);

// All occurrences of a character must be replaced with another character
// while preserving the order of characters.
// No two characters may map to the same character,
// but a character may map to itself.

function toKey(str) {
  let tally = [...str].reduce((tally, char, i) => {
    if (!tally.has(char)) tally.set(char, []);
    tally.get(char).push(i);
    return tally;
  }, new Map());

  let key = JSON.stringify([...tally.values()]);

  return key;
}

function isIsomorphic(str1, str2) {
  let key1 = toKey(str1);
  let key2 = toKey(str2);

  return key1 === key2;
}

// test cases
console.log(isIsomorphic("egg", "add") === true);
console.log(isIsomorphic("foo", "bar") === false);
console.log(isIsomorphic("paper", "title") === true);
console.log(isIsomorphic("parer", "title") === false);
console.log(isIsomorphic("parer", "tiele") === true);
console.log(isIsomorphic("a", "a") === true);
console.log(isIsomorphic("bbbaaaba", "aaabbbba") === false);
console.log(isIsomorphic("bbbaaaba", "aaabbbab") === true);
console.log(isIsomorphic("badc", "baba") === false);

// case
console.log(isIsomorphic("a", "A") === true);
console.log(isIsomorphic("aA", "Aa") === true);
console.log(isIsomorphic("aA", "AA") === false);
console.log(isIsomorphic("aA", "aA") === true);

// Empty Strings
console.log(isIsomorphic("", "") === true);
console.log(isIsomorphic("", "a") === false);
console.log(isIsomorphic("a", "") === false);

// single characters
console.log(isIsomorphic("A", "A") === true);
console.log(isIsomorphic("z", "1") === true);
console.log(isIsomorphic("#", "/") === true);

// Different lengths
console.log(isIsomorphic("a", "aa") === false);
console.log(isIsomorphic("a", "ab") === false);

// whitespace
console.log(isIsomorphic(" ", " ") === true);
console.log(isIsomorphic("a", "a ") === false);
console.log(isIsomorphic("ab", "a ") === true);

// numbers
console.log(isIsomorphic("121122221", "121122221") === true);
console.log(isIsomorphic("121122221", "121122211") === false);
console.log(isIsomorphic("1234543", "2345654") === true);
console.log(isIsomorphic("2234543", "2345654") === false);

// special chars
console.log(isIsomorphic("s 0$s$", "a01bab") === true);
console.log(isIsomorphic("!@#$", "@#$!") === true);

// long strings
let lim = 10 ** 4;
console.log(isIsomorphic("a".repeat(lim), "b".repeat(lim)) === true);
console.log(isIsomorphic("a".repeat(lim), "b".repeat(lim - 1) + "a") === false);
console.log(
  isIsomorphic("abaabbbbc".repeat(lim), "121122223".repeat(lim)) === true,
);
console.log(
  isIsomorphic("abaabbbbc".repeat(lim), "121122221".repeat(lim)) === false,
);
console.log(
  isIsomorphic("abaabbbbc".repeat(lim), "121122223".repeat(lim - 1) + "4") ===
    false,
);

// Deepak Notes
//- I like that you were careful with case
//- typos
//- chars can map to themselves - good catch (abcde, abcde)
//- you jump in between steps a lot (algo/code)
//- maybe not worth running simple things like looping constructs, etc.
//
// Time breakdown
// start: 00:00
// problem + test cases: 12:52
// DS: 16:57
// Algo: 22:00
// Code: 30:48
