"use strict";

function nearSort(page1, page2, cur) {
  let delta1 = Math.abs(page1 - cur);
  let delta2 = Math.abs(page2 - cur);
  if (delta1 === delta2) return page2 - page1;

  return delta1 - delta2;
}

function nearestChapter(book, cur) {
  let entries = Object.entries(book);
  entries.sort(([, page1], [, page2]) => nearSort(page1, page2, cur));

  console.log(entries[0][0]);
  return entries[0][0];
}

nearestChapter(
  {
    "Chapter 1": 1,
    "Chapter 2": 15,
    "Chapter 3": 37,
  },
  10,
); // "Chapter 2"

nearestChapter(
  {
    "New Beginnings": 1,
    "Strange Developments": 62,
    "The End?": 194,
    "The True Ending": 460,
  },
  200,
); // "The End?"

nearestChapter(
  {
    "Chapter 1a": 1,
    "Chapter 1b": 5,
  },
  3,
); // "Chapter 1b"
