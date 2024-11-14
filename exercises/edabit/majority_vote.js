"use strict";
function majorityVote(arr) {
  let tally = arr.reduce(
    (tally, x) => tally.set(x, (tally.get(x) ?? 0) + 1),
    new Map(),
  );

  let filteredKeys = [...tally.keys()].filter(
    (key) => tally.get(key) > arr.length / 2,
  );

  return filteredKeys[0] ?? null;
}

console.log(majorityVote(["A", "A", "B"]) === "A");
console.log(majorityVote(["A", "A", "A", "B", "C", "A"]) === "A");
console.log(majorityVote(["A", "B", "B", "A", "C", "C"]) === null);
