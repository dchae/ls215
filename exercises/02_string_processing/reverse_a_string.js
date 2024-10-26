"use strict";

function reverse(string) {
  let res = [...string].reverse().join("");
  console.log(res);
  return res;
}

reverse("hello"); // returns "olleh"
reverse("The quick brown fox"); // returns "xof nworb kciuq ehT"
