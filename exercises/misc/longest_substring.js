/*
Write a function that gets the longest substring that does not contain any repeating characters.

-- Problem --
Input: string
Output: string representing the longest substring with no repeating chars

Constraints:
Args
- Will always receive one string arg

String Input
- Can contain alphanumeric chars
- Can be empty
- Can contain Uppercase

Requirements:
- return empty string for empty string input
- break ties by lowest index of occurrence
- treat uppercase chars as their lowercase counterparts
- output string should retain case

-- Data Structure --
string
=> array of substrings
=> filtered array
=> "best"
=> string (substring)

"abcABCD1c"
=> "a", "ab", "abc"
=> "bcA"
=> "cAB"
=> "ABC", "ABCD", "ABCD1"
=> "D1c"
=> 'ABCD1'

"abcA" => ["a", "ab", "abc", "abcA", "b", "bc", "bcA", "c", "cA", "A"]
=> ["a", "ab", "abc", "b", "bc", "bcA", "c", "cA", "A"]
best = "abc"

-- Algorithm --
1. return empty string for empty input
2. generate array of all substrings
3. filter the substrings array by uniqueChars
4. init a best variable
5. iterate through unique substrings array, updating best
6. best

HELPER
generate array of substrings
init res
for i in string
for j in substring string(i)
res << substring(..j)
return res

uniqueChars(s)
return true if Set(s.toLowerCase).size == s.length
else false

*/
// Code
"use strict";

// function allSubstrings(str) {
//   let res = [];
//   for (let i = 0; i < str.length; i++) {
//     for (let j = i + 1; j <= str.length; j++) {
//       res.push(str.slice(i, j));
//     }
//   }
//
//   return res;
// }
//
// function uniqueChars(str) {
//   return new Set([...str.toLowerCase()]).size === str.length;
// }
//
// // console.log(uniqueChars("abcd"));
// // console.log(uniqueChars("abca"));
// // console.log(uniqueChars("abcA"));
//
// function nonRepeatingSubstring(str) {
//   if (str.length === 0) return "";
//
//   let substrings = allSubstrings(str);
//   let filtered = substrings.filter(uniqueChars);
//
//   let longest = filtered.reduce((best, substring) => {
//     if (best.length < substring.length) {
//       return substring;
//     }
//     return best;
//   });
//
//   // console.log(longest);
//   return longest;
// }

// function nonRepeatingSubstring(str) {
//   let i = 0;
//   let j = 1;
//   let best = "";
//
//   while (i < str.length && j <= str.length) {
//     let cur = str.slice(i, j);
//
//     if (new Set(cur.toLowerCase()).size === j - i) {
//       // if cur has only unique chars
//       if (cur.length > best.length) best = cur;
//       j++;
//     } else {
//       i++;
//     }
//   }
//
//   return best;
// }

function nonRepeatingSubstring(str) {
  let i = 0;
  let j = 0;
  let tally = new Map();
  let best = [i, j];

  while (j < str.length) {
    let [lChar, rChar] = [i, j].map((x) => str[x].toLowerCase());

    if (!tally.get(rChar)) {
      // if the next char does not exist in window;
      tally.set(rChar, (tally.get(rChar) ?? 0) + 1);
      j++;

      best = j - i > best[1] - best[0] ? [i, j] : best;
    } else {
      // else close
      tally.set(lChar, tally.get(lChar) - 1);
      i++;
    }
  }

  return str.slice(...best);
}

// Test cases:
console.log(nonRepeatingSubstring("abcdefabdhh") === "abcdef");
console.log(nonRepeatingSubstring("ab1defabdhh") === "ab1def");

console.log(nonRepeatingSubstring("a") === "a");
console.log(nonRepeatingSubstring("aa") === "a");
console.log(nonRepeatingSubstring("aaaaaa") === "a");

console.log(nonRepeatingSubstring("abca") === "abc");
console.log(nonRepeatingSubstring("abcA") === "abc");
console.log(nonRepeatingSubstring("abcABCD") === "ABCD");
console.log(nonRepeatingSubstring("abcABCD1c") === "ABCD1");

// ties
console.log(nonRepeatingSubstring("abcABC") === "abc");
console.log(nonRepeatingSubstring("aaaABab") === "AB");

// uppercase/lowercase
console.log(nonRepeatingSubstring("Aa") === "A");
console.log(nonRepeatingSubstring("Aab") === "ab");

// empty input
console.log(nonRepeatingSubstring("") === "");

console.log(nonRepeatingSubstring("fgrjnr9e7g") === "jnr9e7g");
console.log(nonRepeatingSubstring("") === "");
console.log(nonRepeatingSubstring("aa") === "a");
console.log(nonRepeatingSubstring("Abdeff") === "Abdef");
console.log(nonRepeatingSubstring("abCcde") === "abC");
