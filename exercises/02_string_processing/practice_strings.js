"use strict";

let firstName = "Daniel";
let lastName = "Chae";

let fullName = [firstName, lastName].join(" ");

console.log(fullName);

console.log(firstName.concat(lastName));

console.log(fullName.split(" "));

let language = "JavaScript";
let idx = language.indexOf("S");

console.log(idx);

let charCode = language.charCodeAt(idx);
console.log(charCode);

console.log(String.fromCharCode(charCode));

console.log(language.lastIndexOf("a"));

let a = "a";
let b = "b";

console.log(a > b);

b = "B";

console.log(a > b);

console.log(language.slice(1, 4));
console.log(language.slice(2, 4));

console.log(language.substring(1, 4));
console.log(language.substring(2, 4));

console.log(language.slice(1, -1));
console.log(language.slice(2, -1));

console.log(language.substring(1, -1));
console.log(language.substring(2, -1));

let fact1 = "JavaScript is fun";
let fact2 = "Kids like it too";

let compoundSentence =
  fact1 + " and " + fact2[0].toLowerCase() + fact2.slice(1);

console.log(compoundSentence);

console.log(fact1[0]);
console.log(fact2[0]);

let pi = 22 / 7;
pi = pi.toString();
console.log(pi.lastIndexOf("14"));

let boxNumber = (356).toString();
console.log(boxNumber);

boxNumber = parseInt(boxNumber, 10);
console.log(typeof boxNumber);

boxNumber = String(boxNumber);
console.log(typeof boxNumber);

const rl = require("readline-sync");

let userName = rl.question("What is your name? ");
let response = `Hello ${userName}.`;
if (userName.endsWith("!")) {
  response = `HELLO ${userName.slice(0, -1).toUpperCase()}. WHY ARE WE SCREAMING?`;
}

console.log(response);
