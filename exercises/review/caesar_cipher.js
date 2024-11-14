"use strict";
/*
-- Problem --
Input:
- string plaintext
- integer key

Output:
- string (after encryption)

Constraints
Args
- will always receive 2 arguments of type string and integer

plaintext (string)
- can be empty
- Can contain upper and lower alphas, digits, spaces,
  special chars (punctuation)
- uppercase chars are treated like any other letter
- non-letters are ignored

key (integer)
- can be 0
- can be negative
- can't be NaN or +-INF

Rules:
- replace every letter character in the input string
  with its "shifted value" according to the given key

- "shifted value" the case-sensitive alphabet character
  located [key] steps away from the original letter

- empty string returns empty string

-- Data Structure --
string, integer
=> queryable data structure (input key and output shifted value)
  - string of 'A-Z', 'a-z', index it with a normalised key
=> string

string, integer
=> charCodes (integers)
=> string

"A" - 65
offset = 65
startCode = 65 - 65 = 0
shiftedCharCode = offset + (26 + (0 + 3) % 26) % 26 = 65 + 29 % 26 = 65 + 3 = 68


-- Algorithm --
1. replace every letter with its shifted value

HELPER
getShiftedValue(char, key)
- if char is uppercase
  - offset == "A" charcode
- else
  - offset == "a" charcode

- get the charCode of char
- let startCode = charCode - offset
- normalise the key
  - shiftedCharCode = offset + (26 + (startCode + key) % 26) % 26
return char from shiftedCharCode

*/

function getShiftedValue(char, key) {
  let offset;
  if (/[A-Z]/.test(char)) {
    offset = "A".charCodeAt(0);
  } else {
    offset = "a".charCodeAt(0);
  }

  let charCode = char.charCodeAt(0);
  let startCode = charCode - offset;
  let shiftedCharCode = offset + ((26 + ((startCode + key) % 26)) % 26);
  return String.fromCharCode(shiftedCharCode);
}

function caesarEncrypt(plaintext, key) {
  let encoded = plaintext.replace(/[a-z]/gi, (char) =>
    getShiftedValue(char, key),
  );

  console.log(encoded);
  return encoded;
}

// -- Examples / Test Cases --
// simple shift
console.log(caesarEncrypt("A", 0) === "A");
console.log(caesarEncrypt("A", 3) === "D");
console.log(caesarEncrypt("A", 25) === "Z");
console.log(caesarEncrypt("A", 26) === "A");
console.log(caesarEncrypt("A", 29) === "D");

// case
console.log(caesarEncrypt("a", 3) === "d");
console.log(caesarEncrypt("d", -3) === "a");
console.log(caesarEncrypt("d", 23) === "a");
console.log(caesarEncrypt("d", -29) === "a");

// negative key
console.log(caesarEncrypt("D", -3) === "A");

// empty plaintext
console.log(caesarEncrypt("", 0) === "");
console.log(caesarEncrypt("", 3) === "");

// wrap around
console.log(caesarEncrypt("y", 5) === "d");
console.log(caesarEncrypt("a", 47) === "v");

// all letters
console.log(
  caesarEncrypt("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 25) ===
    "ZABCDEFGHIJKLMNOPQRSTUVWXY",
);
console.log(
  caesarEncrypt("The quick brown fox jumps over the lazy dog!", 5) ===
    "Ymj vznhp gwtbs ktc ozrux tajw ymj qfed itl!",
);

// many non-letters
console.log(
  caesarEncrypt(
    "There are, as you can see, many punctuations. Right?; Wrong?",
    2,
  ) === "Vjgtg ctg, cu aqw ecp ugg, ocpa rwpevwcvkqpu. Tkijv?; Ytqpi?",
);

// digits
console.log(caesarEncrypt("Th3 qu1ck 23", 5) === "Ym3 vz1hp 23");
