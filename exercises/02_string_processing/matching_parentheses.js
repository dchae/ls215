"use strict";

function isBalanced(str) {
  let count = 0;

  for (let char of str) {
    if (char === "(") {
      count += 1;
    } else if (char === ")") {
      if (!count) return false;
      count -= 1;
    }
  }

  return !count;
}

const tests = [
  { input: "What (is) this?", expected: true },
  { input: "What is) this?", expected: false },
  { input: "What (is this?", expected: false },
  { input: "((What) (is this))?", expected: true },
  { input: "((What)) (is this))?", expected: false },
  { input: "Hey!", expected: true },
  { input: ")Hey!(", expected: false },
  { input: "What ((is))) up(", expected: false },
];

function runTests(tests, fn, options = {}) {
  let failCount = 0;

  tests.forEach((test, i) => {
    let passed;
    let output;

    try {
      output = fn(test.input);

      if (typeof output === "object") {
        passed = String(output) === String(test.expected);
      } else {
        passed = output === test.expected;
      }
    } catch (e) {
      output = e;
    }

    if (!passed) failCount++;

    console.log(`test #${i + 1}: ${passed ? "pass" : "FAIL"}`);
    if (!passed || options.verbose) {
      console.log(`Input: `);
      console.dir(test.input);
      console.log(`Output:`);
      console.dir(output);
      console.log(`Expected:`);
      console.dir(test.expected);
    }
  });

  console.log(
    failCount === 0 ? "All tests passed" : `${failCount} tests failed.`,
  );
}

runTests(tests, isBalanced, { verbose: true });
