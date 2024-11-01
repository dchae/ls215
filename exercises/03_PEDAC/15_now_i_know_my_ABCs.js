/*
-- Problem --
Input: string representing a word
Output: boolean, representing whether the word is spellable with the given blocks

Requirements:
- Determine whether the given string can be composed with the given blocks:
    B:O   X:K   D:Q   C:P   N:A
    G:T   R:E   F:S   J:W   H:U
    V:I   L:Y   Z:M
- At most, one character from each "block" may appear in the input string
- Treat the letters as case-insensitive

- Will always receive one argument
- Argument type will always be string
- Empty string "" returns true
- Strings with non-alpha chars return false
*/

// -- Examples / Test Cases --
"use strict";

const tests = [
  // generic cases
  { input: "BATCH", expected: true },
  { input: "BUTCH", expected: false },
  { input: "just", expected: true },
  { input: "jUsT", expected: true },
  { input: "BBATCH", expected: false },
  { input: "bBATCH", expected: false },

  // edge cases
  { input: "", expected: true },
  { input: "1", expected: false },
  { input: "DOG!", expected: false },
  { input: "Hi me", expected: false },
];

/*
-- Data Structure --
- Custom object => { "B":"O", "X":"K"...}
- Strings
- boolean output

-- Algorithm --
High-level
1. return false if string contains non-alpha chars
2. parse the "blocks" to create an object
3. determine whether the input string contains more than one block character
4. return false if it does, else true

Detailed
3.
Algo 1
- iterate through string, keeping track of used blocks
  - If character belongs to an unused block
    - "mark" the block as used
  - else (if the char belongs to a used block or no block)
    - return false

Algo 2
- replace every block object key in the string with its value
- check if the string contains duplicates
*/

// Code

const input = `B:O   X:K   D:Q   C:P   N:A   G:T   R:E   F:S   J:W   H:U   V:I   L:Y   Z:M`;
const blocks = Object.fromEntries(
  input.split(/\s+/).map((block) => block.split(":")),
);

function isBlockWord(str) {
  if (/[^a-z]/i.test(str)) return false;

  const replaced = str
    .toUpperCase()
    .replace(/[a-z]/gi, (char) => blocks[char] ?? char);

  return replaced.length === new Set(replaced).size;
}

tests.forEach(({ input, expected }) => {
  let output = isBlockWord(input);

  console.log("input: " + input);
  console.log("expected: " + expected);
  console.log("output: " + output);
  console.log((output === expected ? "PASS" : "FAIL") + "\n");
});
