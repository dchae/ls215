"use strict";

function isUrl(str) {
  return /^https?:\/\/\S+\.\S+$/.test(str);
}

console.log(isUrl("https://launchschool.com")); // -> true
console.log(isUrl("http://example.com")); // -> true
console.log(isUrl("https://example.com hello")); // -> false
console.log(isUrl("   https://example.com")); // -> false
console.log(isUrl("https://mail.google.com")); // -> true
console.log(isUrl("https://mailgooglecom")); // -> true
