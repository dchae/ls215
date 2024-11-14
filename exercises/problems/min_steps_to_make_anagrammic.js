"use strict";
/*
You are given two strings s and t.
In one step you can choose any character of t
and replace it with another character.

Return the minimum number of steps to make t an anagram of s.
*/

// console.log(minSteps("bab", "aba") === 1);
// console.log(minSteps("aab", "aba") === 0);

/*
String a is an anagram in regards to string b if they contain the same letters.

Constraints:
args
- Will always receive two string arguments
- s and t will always be contain the same number of letters
- strings may be empty, return 0
- strings may contain uppercase characters
  - treat uppercase characters as the same as their lowercase counterparts
- strings may contain numbers
  - ignore numbers
*/

function toTally(iter) {
  let tally = new Map();
  for (let i = 0; i < iter.length; i++) {
    if (!/[a-z]/i.test(iter[i])) continue;
    let key = iter[i].toLowerCase();
    tally.set(key, (tally.get(key) ?? 0) + 1);
  }

  return tally;
}

function minSteps(s, t) {
  let res = 0;
  let tallyS = toTally(s);
  let tallyT = toTally(t);

  tallyS.forEach((count, char) => {
    let delta = count - (tallyT.get(char) ?? 0);
    if (delta > 0) res += delta;
  });

  return res;
}

console.log(minSteps("bab", "aba") === 1);
console.log(minSteps("bbb", "aba") === 2);
console.log(minSteps("bbb", "aaa") === 3);
console.log(minSteps("leetcode", "practice") === 5);

// anagrams
console.log(minSteps("aab", "aba") === 0);
console.log(minSteps("anagram", "mangaar") === 0);

// empty string
console.log(minSteps("", "") === 0);

// single char
console.log(minSteps("a", "a") === 0);
console.log(minSteps("a", "A") === 0);
console.log(minSteps("a", "b") === 1);

// no letters
console.log(minSteps("1234", "1234") === 0);
console.log(minSteps("1234", "5678") === 0);

// identical strings
console.log(minSteps("anagram", "anagram") === 0);
console.log(minSteps("Anagram", "anagram") === 0);

// uppercase
console.log(minSteps("BaB", "Aba") === 1);
console.log(minSteps("LeetCode", "PracticE") === 5);

// numbers
console.log(minSteps("1b2b3b", "aba") === 2);
console.log(minSteps("1a2a3b", "123aba") === 0);
console.log(minSteps("abc", "1a2b3c") === 0);
console.log(minSteps("123abc", "def123") === 3);
