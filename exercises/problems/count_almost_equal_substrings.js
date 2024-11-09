"use strict";

/*
Given two strings s and t, find the number of times a substring of s
is "almost equal" to a substring of t.

For example:
- Take the two strings "computer" and "computation".
- The substrings "compute" and "computa" only differ by one character,
  the 'e'/'a', and are therefore "almost equal".
*/

console.log(countSubstrings("aba", "baba") === 6);
console.log(countSubstrings("ab", "bb") === 3);

/*
-- Problem --
Input: two strings s, t
Output: integer representing the number of a, b pairs
        - where a and b are equal-length substrings of s and t respectively
        - and a differs from b by exactly one character

- A substring is a contiguous sequence of characters within a string.

Constraints:
Args
- Will always receive two string arguments

Input Strings
- Can be empty
- will ony contain lowercase alpha chars

Requirements:
- return the number of pairs of indices (i, j)
    - where s[i..i+k], t[i..i+k]
    - and the number of differences between s and t at every index == 1

*/

function almostEqual(str1, str2) {
  let diffCount = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) diffCount++;
  }
  return diffCount === 1;
}

function getAlmostEqualSubstrings(str, target) {
  let res = [];
  for (let i = 0; i <= str.length - target.length; i++) {
    let candidate = str.slice(i, i + target.length);
    if (almostEqual(target, candidate)) res.push(candidate);
  }
  return res;
}

function countSubstrings(s, t) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    for (let k = 1; i + k <= s.length; k++) {
      let substring = s.slice(i, i + k);
      let matches = getAlmostEqualSubstrings(t, substring);
      count += matches.length;
    }
  }

  return count;
}

// version for making test cases/ debugging

// function countSubstrings(str, target) {
//   let res = [];
//
//   for (let i = 0; i < str.length; i++) {
//     for (let k = 1; i + k <= str.length; k++) {
//       for (let j = 0; j + k <= target.length; j++) {
//         let substring = str.slice(i, i + k);
//         let targetSubStr = target.slice(j, j + k);
//
//         if (almostEqual(substring, targetSubStr)) {
//           res.push([substring, targetSubStr]);
//         }
//       }
//     }
//   }
//   console.log(str, target);
//   console.log(res);
//   console.log("-".repeat(10));
//   return res.length;
// }

// Examples / Test Cases
// Happy Path
console.log(countSubstrings("aba", "baba") === 6);
console.log(countSubstrings("ab", "bb") === 3);
console.log(countSubstrings("ab", "ab") === 2);
console.log(countSubstrings("ab", "abc") === 4);
console.log(countSubstrings("abc", "abc") === 6);
console.log(countSubstrings("abc", "abd") === 9);
console.log(countSubstrings("abc", "abb") === 9);
console.log(countSubstrings("abba", "baab") === 14);

// length 1
console.log(countSubstrings("a", "b") === 1);
console.log(countSubstrings("a", "bb") === 2);
console.log(countSubstrings("a", "bc") === 2);
console.log(countSubstrings("a", "bcd") === 3);

// repetitions
console.log(countSubstrings("a", "bbbbb") === 5);
console.log(countSubstrings("aaaaa", "b") === 5);
console.log(countSubstrings("aaaaa", "bbbbb") === 25);
console.log(countSubstrings("aaaaa", "abcde") === 24);

// output zero
console.log(countSubstrings("a", "a") === 0);
console.log(countSubstrings("aa", "aa") === 0);
console.log(countSubstrings("a", "aaaaaaaaaa") === 0);
console.log(countSubstrings("aaaaaaaaaa", "a") === 0);

// empty strings
console.log(countSubstrings("", "baba") === 0);
console.log(countSubstrings("baba", "") === 0);
console.log(countSubstrings("", "") === 0);

// Deepak Notes

// Finish times:
// Start: 0:00
// Problem/ Test Cases: 17:13
// Data Structure: 18:15
// Algorithm:
// Code:
// Debugging:

// Notes:
// - Yesterday we talked about how to deal with being pressed for time
//   and also generating substrings, so I thought this question would be good
// - Good catch on same length
// - catching your typos more - good!
// - felt like you could have written your examples
//   that are under rules as test cases and saved time
// - I like that you went straight to helper functions this time
// - also like that you write your expected input and output types
// - bit of vague wording in your algorithm steps
//    - "transform all the substrings..."
// - feel like you forced yourself to jump to coding before you really
//   had the isAlmostEqual helper algorithm down
// - there were some moments during the coding where you stopped
//   saying what you expect logs to output
