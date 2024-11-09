"use strict";
/*
Given two strings s and t, find the number of substrings in s
that differ from some substring in t by exactly one character.

For example:
- Take the two strings "computer" and "computation".
- The substrings "compute" and "computa" only differ by one character,
  the 'e'/'a'.
*/

console.log(countSubstrings("aba", "baba") === 6);
console.log(countSubstrings("ab", "bb") === 3);

/*
-- Problem --
Input: two strings s, t
Output: integer representing the number of a, b pairs
        - where a and b are equal-length substrings of s and t respectively
        - and a differs from b by exactly one character

Constraints:
Args
- Will always receive two string arguments

Input Strings
- will never be empty
- will ony contain lowercase alpha chars

Requirements:
- A substring is a contiguous sequence of characters within a string.
- return the number of pairs of indices (i, j)
    - where s[i..i+k], t[i..i+k]
    - and the number of differences between s and t at every index == 1

-- Data Structure --
2 strings
=> integer

option 1:
=> array of all substrings
=> array of all pairs
=> count

option 2:
integer variable `count`

"ab", "bb"
"a" => "b", "b",
"ab" => "bb",
"b" => ,

count = 3

-- Algorithm --
1. init count to 0
2. iterate through substrings of s
    - if there is an almostEqual substring of same length in t
        - increment count
3. return count

2. for index i in s
    - init substringLength = 1
    - while i+k is within the bounds of s
        - substring = s.slice(i, i+k)
        - matches = get almostEqualSubstrings(t, target)
        - increment count by matches

HELPER
almostEqual(str1, str2) // assume str1, str2 are same length
- init differenceCount to 0
- iterate through str1
- if str1[i] !== str2[i], differenceCount++
- return differenceCount === 1

getAlmostEqualSubstrings(str, target)
    - init res
    - for (i..str.length - target.length)
        - let candidate = (str.slice(i, i+target.length)
        if almostEqual(target, candidate)
        push candidate to res
    - return res
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

// function countSubstrings(s, t) {
//   let count = 0;
//   for (let i = 0; i < s.length; i++) {
//     for (let k = 1; i + k <= s.length; k++) {
//       let substring = s.slice(i, i + k);
//       let matches = getAlmostEqualSubstrings(t, substring);
//       count += matches.length;
//     }
//   }
//
//   return count;
// }

function countSubstrings(str, target) {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    for (let k = 1; i + k <= str.length; k++) {
      for (let j = 0; j + k <= target.length; j++) {
        let substring = str.slice(i, i + k);
        let targetSubStr = target.slice(j, j + k);

        if (almostEqual(substring, targetSubStr)) count++;
      }
    }
  }

  return count;
}

// Examples / Test Cases
// Happy Path
console.log(countSubstrings("aba", "baba") === 6);
console.log(countSubstrings("ab", "bb") === 3);
console.log(countSubstrings("ab", "ab") === 2);
console.log(countSubstrings("ab", "abc") === 4);
console.log(countSubstrings("abc", "abc") === 6);
console.log(countSubstrings("abc", "abb") === 9);

// length 1
console.log(countSubstrings("a", "b") === 1);
console.log(countSubstrings("a", "bb") === 2);
console.log(countSubstrings("a", "bc") === 2);
console.log(countSubstrings("a", "bcd") === 3);

// output zero
console.log(countSubstrings("a", "a") === 0);
console.log(countSubstrings("aa", "aa") === 0);
