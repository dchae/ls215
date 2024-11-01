/*
-- Problem --
Input: positive integer n
Output: String representation of the prime factorisation of n

Rules:
- String representation should take the following form:
  - (p1**n1)(p2**n2)...(pk**nk), were p(i) is in increasing order
  - e.g.: 86240 should return "(2**5)(5)(7**2)(11)"

-- Data Structures --
object containing prime factors as keys and powers as values
- 86240 => {2: 5, 5: 1, 7: 2, 11: 1}


-- Algorithm --

Helper Function getFactors(n) :int => :object
init factors = [n]
for x in range (2..sqrt(n))
  if x is a factor of n
    merge factors with getFactors(x), getFactors(n / x)
return factors
*/

"use strict";

function factorise(n) {
  let factors;

  for (let x = 2; x ** 2 <= n; x++) {
    if (n % x === 0) {
      factors = [...factorise(x), ...factorise(n / x)];
      break;
    }
  }

  return factors ?? [n];
}

function primeFactors(n) {
  const factors = factorise(n);

  const tally = factors.reduce(
    (tally, factor) => ((tally[factor] = (tally[factor] ?? 0) + 1), tally),
    {},
  );

  let output = Object.entries(tally)
    .map(([prime, power]) => {
      return `(${prime}${power > 1 ? "**" + power : ""})`;
    })
    .join("");

  return output;
}

// test cases

console.log(primeFactors(2));
console.log(primeFactors(3));
console.log(primeFactors(12));
console.log(primeFactors(86240)); // "(2**5)(5)(7**2)(11)"
console.log(primeFactors(7775460)); //"(2**2)(3**3)(5)(7)(11**2)(17)"
