"use strict";
/*
-- Problem --
Input: string
Output: integer array containing prime numbers

Constraints:
- Will always one string argument

string
- can be empty
- can contain no digits
- can contain uppercase, lowercase alphas,
  digit characters, spaces, special characters

Rules:
- if empty string, return empty array
- if string contains no numbers, return empty array
- if string contains no prime numbers, return empty array
- 1, 0 are not prime

- "numbers present as substrings":
  - any consecutive sequence of numeric (0-9) characters
- "numbers" will always be non-negative integers
  - "1.2" => [1, 2]
  - "1/2" => [1, 2]
  - "-1" => [1]

- return all prime numbers found (including duplicates)
- order by order of appearance


-- Data Structure --
string
=> string array (of numbers)
=> integer array
=> integer array containing primes

"a4bc2k13d"
=> ["4", "2", "13"]
=> [4, 2, 13]
=> [2, 13]

-- Algorithm --
1. create array of all numeric strings
  - regex match
2. map that array to integers
3. filter integers for primes
  - isPrime
4. return primes array

HELPER
isPrime(n)
(2..sqrt(n)).any? x: (n is divisible by x)

*/

// Code
function isPrime(n) {
  if (n < 2) return false;

  for (let x = 2; x ** 2 <= n; x++) {
    if (n % x === 0) return false;
  }

  return true;
}

// for (let i = 0; i < 100; i++) {
//   if (isPrime(i)) console.log(i);
// }

function primeNumberPrinter(string) {
  console.log(string);
  let numStrings = string.match(/\d+/g) ?? [];
  let nums = numStrings.map(Number);
  let primes = nums.filter(isPrime);
  return primes;
}

// -- Examples / Test Cases --
// happy path
console.log(
  JSON.stringify(primeNumberPrinter("a4bc2k13d")) === JSON.stringify([2, 13]),
);

console.log(
  JSON.stringify(primeNumberPrinter("as17Hi3asdf1d22oi13.0")) ===
    JSON.stringify([17, 3, 13]),
);

// uppercase
console.log(
  JSON.stringify(primeNumberPrinter("a4Bc2K13D")) === JSON.stringify([2, 13]),
);

// spaces
console.log(
  JSON.stringify(primeNumberPrinter("a4 bc 2k 13 d")) ===
    JSON.stringify([2, 13]),
);

// special characters
console.log(
  JSON.stringify(primeNumberPrinter("a4$bc#2k@13!d")) ===
    JSON.stringify([2, 13]),
);

console.log(
  JSON.stringify(primeNumberPrinter("-3a2/4d2.5f1,0")) ===
    JSON.stringify([3, 2, 2, 5]),
);

// Empty string
console.log(JSON.stringify(primeNumberPrinter("")) === JSON.stringify([]));

// no numbers
console.log(
  JSON.stringify(primeNumberPrinter("asdfASDF!@#$ ")) === JSON.stringify([]),
);

// no prime numbers
console.log(
  JSON.stringify(primeNumberPrinter("0as1ds4df8dfljk9432fui33")) ===
    JSON.stringify([]),
);
