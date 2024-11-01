"use strict";

// Suppose you have an arbitrary natural number (the target)
// and a set of one or more additional natural numbers (the factors).
// Write a program that computes the sum of all numbers from 1 up to
// the target number that are also multiples of one of the factors.

// For instance, if the target is 20, and the factors are 3 and 5,
// that gives us the list of multiples 3, 5, 6, 9, 10, 12, 15, 18.
// The sum of these multiples is 78.
// If no factors are given, use 3 and 5 as the default factors.
//
// Problem
// Compute sum of k in range (1...n) where k % f == 0 for given factors f.
// input: int, int array
// output: int
// - If no factors are provided, default to 3 and 5.
// - range in non-inclusive
// - When no factors are given, do we get an empty array, or no input?
//    - Going to say no input
//
// Examples / Test Cases
const tests = [
  { input: [20, [3, 5]], expected: 78 },
  { input: [20], expected: 78 },
  { input: [3], expected: 0 },
  { input: [3], expected: 0 },
  { input: [0], expected: 0 },
  { input: [12, [2]], expected: 30 },
  { input: [12, [12]], expected: 0 },
  { input: [12, [11]], expected: 11 },
  { input: [12, [11, 10]], expected: 21 },
];

// Data Structure
// Set
//
// Algorithm
// init factors to default value if not provided
// init set
// for each factor f:
//   for x in range (f...n) step(f):
//     add x to set
//
// reduce set to sum
//
// return sum

function sumMultiples(n, factors = [3, 5]) {
  const multiples = new Set();
  for (let factor of factors) {
    for (let x = factor; x < n; x += factor) {
      multiples.add(x);
    }
  }

  return multiples.values().reduce((acc, x) => acc + x, 0);
}

tests.forEach((test) =>
  console.log(sumMultiples(...test.input) === test.expected),
);
