"use strict";

function tally(iterable) {
  let lowercase = 0;
  let uppercase = 0;
  let neither = 0;

  for (let i = 0; i < iterable.length; i++) {
    let cur = iterable[i];
    if (/[a-z]/.test(cur)) lowercase += 1;
    else if (/[A-Z]/.test(cur)) uppercase += 1;
    else neither += 1;
  }

  return { lowercase, uppercase, neither };
}

function letterCaseCount(str) {
  console.log(tally(str));
}

letterCaseCount("abCdef 123"); // { lowercase: 5, uppercase: 1, neither: 4 }
letterCaseCount("AbCd +Ef"); // { lowercase: 3, uppercase: 3, neither: 2 }
letterCaseCount("123"); // { lowercase: 0, uppercase: 0, neither: 3 }
letterCaseCount(""); // { lowercase: 0, uppercase: 0, neither: 0 }
