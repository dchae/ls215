"use strict";

function tally(s) {
  return [...s].reduce(
    (hash, c) => hash.set(c, (hash.get(c) ?? 0) + 1),
    new Map(),
  );
}

function isAnagram(word, candidate) {
  const wordTally = tally(word);
  const candidateTally = tally(candidate);

  return (
    wordTally.size === candidateTally.size &&
    wordTally.keys().every((k) => wordTally.get(k) === candidateTally.get(k))
  );
}

// function anagram(word, list) {
//   return list.filter((candidate) => isAnagram(word, candidate));
// }

function anagram(word, list) {
  return list.filter(
    (candidate) =>
      [...word].toSorted().join("") === [...candidate].toSorted().join(""),
  );
}

console.log(anagram("listen", ["enlists", "google", "inlets", "banana"])); // [ "inlets" ]
console.log(anagram("listen", ["enlist", "google", "inlets", "banana"])); // [ "enlist", "inlets" ]
