"use strict";

function logResults(test, output) {
  console.log(`Input: `);
  console.dir(test.input);
  console.log(`Output:`);
  console.dir(output);
  console.log(`Expected:`);
  console.dir(test.expected);
}

function runTest(fn, test, i, { verbose }) {
  let passed;
  let output;

  output = fn(test.input);

  if (typeof output === "object") {
    verbose = true;
    passed = String(output) === String(test.expected);
  } else {
    passed = output === test.expected;
  }

  console.log(`test #${i + 1}: ${passed ? "pass" : "FAIL"}`);

  if (!passed || verbose) {
    logResults(test, output);
  }

  return passed;
}

function runTests(tests, fn, options = {}) {
  const allPassed = tests.every((test, i) => runTest(fn, test, i, options));

  console.log(allPassed ? "All tests passed" : `One or more tests failed.`);
}

const tests = [{ input: undefined, expected: undefined }];

runTests(tests, fn);

// Performance testing

// const { performance } = require('perf_hooks');

function randomAlphaString(n) {
  return Array(n)
    .fill()
    .map(() => String.fromCharCode(~~(65 + Math.random() * 26)))
    .join("");
}

function randomIntArray(n, maxVal = 100) {
  return Array(n)
    .fill()
    .map(() => Math.floor(Math.random() * maxVal));
}

function generateTests(lim = 10) {
  const tests = [];

  for (let i = 0; i < lim; i++) tests.push(randomAlphaString(100));

  return tests;
}

function testPerformance(tests, fn, lim = 100) {
  let startTime = performance.now();
  for (let i = 0; i < lim; i++) {
    tests.forEach((test) => fn(test));
  }
  let endTime = performance.now();
  const results = tests.map((test) => fn(test));

  return { name: fn.name, time: endTime - startTime, results: results };
}

function runPerformanceComparison(tests, ...fns) {
  const results = fns.map((fn) => testPerformance(tests, fn));

  results.forEach((result) =>
    console.log(`'${result.name}' solution took: ${result.time} ms`),
  );
}

const randomTests = generateTests();
runPerformanceComparison(tests);
