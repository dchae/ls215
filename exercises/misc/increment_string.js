/*
Write a function which increments a string, to create a new string.

-- Problem --
Input: string
Output: string that is "incremented"

Constraints:
Args
- Will always receive one string argument

String Input
- Can be empty
- Can end in a parseable integer
  - When it does, increment that int
  - When it does not, treat it as ending in '0'
- Will only contain alphanumeric chars (lowercase)

"parseable integer"
- ending consecutive sequence of numeric chars

Requirements:
- Empty string returns "1"

-- Data Structure --
string
string, integer
string, incremented integer
=> string

'foobar1'
=> 'foobar', '1'
=> 'foobar', 1
=> 'foobar', 1++
=> 'foobar', 2
=> 'foobar2'

'foobar', ''
=> 'foobar', 0
=> 'foobar', 0++
=> 'foobar', 1
=> 'foobar1'

'00'
=> '0', '0'
=> '0', 0
=> '0', 0++
=> '0', 1
=> '01'

-- Algorithm --
1. split the string into "word" and numeric parts
2. cast the numeric part into number or set it to zero if it is ""
3. increment the numeric part
4. concatenate the word part and the incremented numeric part
5. if the concatenated string length is less than the input, pad left with zeros
6. return the concatenated string

*/
"use strict";
// code

// function incrementString(str) {
//   // let [, word, numeric] = str.match(/([a-z0-9]*?)(\d*)$/);
//   // let numeric = (str.match(/\d+$/g) ?? [])[0] ?? "";
//   let word = str.slice(0, str.length - numeric.length);
//
//   numeric = String(Number(numeric) + 1);
//
//   let padded = numeric.padStart(str.length - word.length, "0");
//   let concatenated = word + padded;
//   return concatenated;
// }

function incrementString(str) {
  // return str.replace(/09+$|([1-9]\d*)?\d?$/, (n) => ++n);
  return str.replace(/[0-8]?9*$/, (n) => ++n);
}

// Test cases:
// happy path
console.log(incrementString("foobar1") === "foobar2");
console.log(incrementString("foobar12") === "foobar13");
console.log(incrementString("foobar9") === "foobar10");
console.log(incrementString("foobar99") === "foobar100");
console.log(incrementString("foo1bar99") === "foo1bar100");

// empty string
console.log(incrementString("") === "1");

// no ending number
console.log(incrementString("abc") === "abc1");

// ends in zero
console.log(incrementString("0") === "1");
console.log(incrementString("00") === "01");
console.log(incrementString("0001") === "0002");
console.log(incrementString("100") === "101");
console.log(incrementString("abc0") === "abc1");

console.log(incrementString("109") === "110");

console.log(incrementString("foo") === "foo1");
console.log(incrementString("") === "1");
console.log(incrementString("foobar001") === "foobar002");
console.log(incrementString("foobar000") === "foobar001");
console.log(incrementString("foobar099") === "foobar100");
console.log(incrementString("foobar99") === "foobar100");
console.log(incrementString("f00bar99") === "f00bar100");
console.log(incrementString("001") === "002");

console.log(incrementString("foobar199") === "foobar200");
console.log(incrementString("foobar1099") === "foobar1100");
