/*
-- Problem --
Input: string array
Output: string array containing all elements that contain
        the same vowels as the first word

Constraints:
Args
- Will always receive one argument of type array

Array
- Can be empty
- Cannot be sparse
- Cannot have object properties
- will not be ordered
- will only contain string elements

Array elements
- can be empty
- will always be a word
  - will contain only lowercase letters and whitespace

Output Array
- should be sorted by order of appearance in input array


Requirements:
- return array of elements for which:
  - the set of vowels in element is equivalent
    to the set of vowels in the first element

- return empty array for empty array input
- output array should be sorted by order of appearance in input array
- empty strings are equivalent to strings with no vowels
- whitespaces are essentially consonants

-- Data Structure --

["toe", "ocelot", "maniac"]
[Set(2) { "o", "e" }, Set(2) { "o", "e" }, Set(2) { "a", "i"}]
[Set(2) { "o", "e" }, Set(2) { "o", "e" }]

=> ["toe", "ocelot"]

-- Algorithm --
1. filter array by sameVowels(array[0], element)
2. return filtered array

HELPER sameVowels(target, candidate)
create set of vowels from target
create set of vowels from candidate
return set1.difference(set2).size === 0

*/

// Code
"use strict";

function removeNonVowels(str) {
  return str.replace(/[^aeiou]/gi, "");
}

function sameVowels(target, candidate) {
  let targetVowels = new Set(removeNonVowels(target));
  let candidateVowels = new Set(removeNonVowels(candidate));

  // return !targetVowels.symmetricDifference(candidateVowels).size;
  let passes = true;
  targetVowels.forEach((v) => (passes = passes && candidateVowels.has(v)));
  return targetVowels.size === candidateVowels.size && passes;
}

function sameVowelGroup(words) {
  return words.filter((word) => sameVowels(words[0], word));
}

// Examples / Test Cases
const tests = [
  { input: ["toe", "ocelot", "maniac"], expected: ["toe", "ocelot"] },
  { input: ["toe", "ocelot", "money"], expected: ["toe", "ocelot", "money"] },
  { input: ["to", "ocelot", "money"], expected: ["to"] },
  { input: ["t", "ocelot", "money"], expected: ["t"] },
  { input: ["t", "s", "ocelot", "money"], expected: ["t", "s"] },

  {
    input: ["many", "carriage", "emit", "apricot", "animal"],
    expected: ["many"],
  },

  {
    input: ["hoops", "chuff", "bot", "bottom"],
    expected: ["hoops", "bot", "bottom"],
  },

  // empty strings
  { input: ["t", "", "ocelot", "money"], expected: ["t", ""] },
  { input: ["", "", "ocelot", "money"], expected: ["", ""] },
  { input: ["", "", "t", "ocelot", "money"], expected: ["", "", "t"] },

  // whitespace
  { input: ["toe", "oce lot", "maniac"], expected: ["toe", "oce lot"] },
  { input: ["to e", "oce lot", "maniac"], expected: ["to e", "oce lot"] },

  // empty array
  { input: [], expected: [] },

  // single element array
  { input: ["toe"], expected: ["toe"] },
  { input: ["t"], expected: ["t"] },
  { input: [""], expected: [""] },
];

tests.forEach(({ input, expected }) => {
  let output = sameVowelGroup(input);
  console.log(input);
  console.log(output);
  console.log(JSON.stringify(output) === JSON.stringify(expected));
});
