// Description:
// Given a character matrix, find out the character which has the smallest amount.

// Arguments:
// matrix: A string that contains some letters. Each row is separated by "\n".

// Examples

// matrix=
// 00000000
// 0000O000
// 00000000
// 00000000
// 00000000

// result -> "O"

// matrix=
// AAAAA
// ABBBB
// BCCCC
// DDDDE
// EEEEF
// FFFFF
//
// result -> "CD"

// Rules:
// Returns the characters which has smallest amount, using string format.
// If more than one characters are found, sort them according to the order A-Za-z0-9.
// You can assume that there are at least two characters in the matrix.

// Notes:
// - I said "return them together", I never said array.
// - you should say what you expect console logs to run before you run them
// - you assumed the sorting part would be trivial, but it was not
//    - should have had an algo for this
//
"use strict";

function makeTally(matrix) {
  const tally = new Map();
  for (let i = 0; i < matrix.length; i++) {
    let char = matrix[i];
    if (char === "\n") continue;

    tally.set(char, (tally.get(char) ?? 0) + 1);
  }
  return tally;
}
function findCharacters(matrix) {
  if (matrix === "") return "";

  let tally = makeTally(matrix);
  let best = [matrix[0], matrix.length];
  for (let [key, val] of tally.entries()) {
    if (val < best[1]) {
      best = [key, val];
    } else if (val === best[1]) {
      best[0] += key;
    }
  }

  return best[0]
    .split("")
    .sort()
    .join("")
    .replace(/(\d+)(\D+)/, "$2$1");
}

function findCharacters(matrix) {
  if (matrix === "") return "";
  let characters = matrix.match(/\w/gi);
  let count = characters.reduce((acc, cv) => {
    acc[cv] = acc[cv] + 1 || 1;
    return acc;
  }, {});

  let entries = Object.entries(count);
  let lowest = Math.min(...entries.map((entry) => entry[1]));
  let lowestArray = entries
    .filter((entry) => entry[1] === lowest)
    .map((entry) => entry[0]);

  if (lowestArray.length === 1) return lowestArray[0];
  let uppers = lowestArray.filter((ele) => /[A-Z]/.test(ele)).sort();
  let lowers = lowestArray.filter((ele) => /[a-z]/.test(ele)).sort();
  let digits = lowestArray.filter((ele) => /[0-9]/.test(ele)).sort();

  return uppers.concat(lowers, digits).join("");
}

let matrix = `00000000
0000O000
00000000
00000000
00000000`;
console.log(findCharacters(matrix)); //  "O"

matrix = `mmmmmmmmmmmmm
mmmmmmmmmmmmm
mmmmmmmmmmmmm
mmmmmmmmmnmmm`;
console.log(findCharacters(matrix)); // "n"

matrix = `AAAAAAAAAAA
AABBBBBBBBB
BCCCCCCCCDD
DDDDEEEEFFF`;
console.log(findCharacters(matrix)); //  "F"

matrix = `AAAAA
ABBBB
BCCCC
DDDDE
EEEEF
FFFFF`;
console.log(findCharacters(matrix)); // "CD"

matrix = `3v652
1uwyt
v254v
t54tv
x45yx
s7x45
5402v
2x3xw
5w22v`;
console.log(findCharacters(matrix)); // "su0167"

matrix = "";
console.log(findCharacters(matrix)); // ""
