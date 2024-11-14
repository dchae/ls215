"use strict";

function toTally(iter) {
  return iter.reduce(
    (tally, x) => tally.set(x, (tally.get(x) ?? 0) + 1),
    new Map(),
  );
}

function mode(arr) {
  let tally = toTally(arr);

  let maxCount = Math.max(...tally.values());
  let filteredKeys = [...tally.keys()].filter(
    (key) => tally.get(key) === maxCount,
  );

  return filteredKeys.sort((a, b) => a - b);
}
