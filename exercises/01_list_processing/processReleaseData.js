"use strict";

// function extractEntries(obj, ...keys) {
//   const entries = Object.entries(obj);
//   const filtered = entries.filter(([k, _]) => keys.includes(k));
//   return Object.fromEntries(filtered);
// }
//
// function processReleaseData(data) {
//   const filtered = data.filter((obj) => obj.id && obj.title);
//   const mapped = filtered.map((obj) => extractEntries(obj, "id", "title"));
//   return mapped;
// }

function processReleaseData(data) {
  return data.reduce(
    (res, release) =>
      release.id !== undefined && release.title
        ? (res.push({ id: release.id, title: release.title }), res)
        : res,
    [],
  );
}

let newReleases = [
  {
    id: 70111470,
    title: "Die Hard",
    boxart: "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
    uri: "http://api.netflix.com/catalog/titles/movies/70111470",
    rating: [4.0],
    bookmark: [],
  },
  {
    id: 654356453,
    boxart: "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
    uri: "http://api.netflix.com/catalog/titles/movies/70111470",
    rating: [5.0],
    bookmark: [{ id: 432534, time: 65876586 }],
  },
  {
    title: "The Chamber",
    boxart: "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
    uri: "http://api.netflix.com/catalog/titles/movies/70111470",
    rating: [4.0],
    bookmark: [],
  },
  {
    id: 675465,
    title: "Fracture",
    boxart: "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
    uri: "http://api.netflix.com/catalog/titles/movies/70111470",
    rating: [5.0],
    bookmark: [{ id: 432534, time: 65876586 }],
  },
];

console.log(processReleaseData(newReleases));

// should return:
// [{ id: 70111470, title: 'Die Hard'}, { id: 675465, title: 'Fracture' }];
