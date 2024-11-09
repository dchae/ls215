"use strict";
/*
-- Problem --
input:
- integer representing an amount of money, money
- integer representing a product identifier, productNumber
output:
- object representing the product and change
- OR a string if productNumber is not valid, or money is not enough

Constraints:
args
- will always receive two args of type int and int

money: int
- will always be an integer
- can be negative or 0
- will always be divisible by ten

productNumber: int
- will always be an integer
- can be negative or 0

Rules:
- output object has property names "product" and "change"
  - the value of "product" is the product name of the item
    corresponding to productNumber in the products array.
  - the value of "change" is an array containing the coins returned as change
    - the sum of change should be money - the cost of the product
    - the values of change can be: [500, 200, 100, 50, 20, 10]
    - the change array should be sorted in descending order
    - if value of money is equal to the price, return an empty array as change
- if productNumber is invalid, return the string "Enter a valid product number."
- if the value of money is less than the price of the specified product,
  return the string "Not enough money for this product."

-- Data Structure --
int, int
=> product object
=> changeTotal (int)
=> change array
=> object or string

200, 7
{ number: 7, price: 120, name: "Crackers" }
200 - 120 = 80 (changeTotal)
[50, 20, 10]
{product: "Crackers", change: [50, 20, 10]}

-- Algorithm --
1. get product using productNumber
  - just index products array
  - if the product doesn't exist, return error string
2. calculate the changeTotal
  - if the changeTotal is negative, return error string
3. turn the changeTotal into an array of coins
4. return object with product and change keys

HELPER getCoinsArray(changeTotal)
- init const coins [500, 200, ...]
- init coinsArray to empty array
- while changeTotal >= Math.min(coins)
  - find the coin that is less than changeTotal
    - add the coin to coinsArray
    - subtract the coin value from changeTotal
return coinsArray

*/

const products = [
  { number: 1, price: 100, name: "Orange juice" },
  { number: 2, price: 200, name: "Soda" },
  { number: 3, price: 150, name: "Chocolate snack" },
  { number: 4, price: 250, name: "Cookies" },
  { number: 5, price: 180, name: "Gummy bears" },
  { number: 6, price: 500, name: "Condoms" },
  { number: 7, price: 120, name: "Crackers" },
  { number: 8, price: 220, name: "Potato chips" },
  { number: 9, price: 80, name: "Small snack" },
];

// function getCoinsArray(total) {
//   let coins = [500, 200, 100, 50, 20, 10];
//   let coinsArray = [];
//
//   while (total >= Math.min(...coins)) {
//     let coin;
//     for (let x of coins) {
//       coin = x;
//       if (coin <= total) break;
//     }
//     coinsArray.push(coin);
//     total -= coin;
//   }
//   return coinsArray;
// }

function getCoinsArray(total) {
  let coins = [500, 200, 100, 50, 20, 10];
  let biggest = coins.find((coin) => coin <= total);
  if (!biggest) return [];

  return [biggest, ...getCoinsArray(total - biggest)];
}

function vendingMachine(products, money, productNumber) {
  let productObj = products[productNumber - 1];
  if (!productObj) return "Enter a valid product number";

  let changeTotal = money - productObj.price;
  if (changeTotal < 0) return "Not enough money for this product";

  let change = getCoinsArray(changeTotal);
  let product = productObj.name;

  return { product, change };
}

// -- Examples / Test Cases --
// Happy path
console.log(
  JSON.stringify(vendingMachine(products, 200, 7)) ===
    JSON.stringify({ product: "Crackers", change: [50, 20, 10] }),
);

console.log(
  JSON.stringify(vendingMachine(products, 210, 2)) ===
    JSON.stringify({ product: "Soda", change: [10] }),
);

console.log(
  JSON.stringify(vendingMachine(products, 220, 2)) ===
    JSON.stringify({ product: "Soda", change: [20] }),
);

console.log(
  JSON.stringify(vendingMachine(products, 230, 2)) ===
    JSON.stringify({ product: "Soda", change: [20, 10] }),
);

console.log(
  JSON.stringify(vendingMachine(products, 240, 2)) ===
    JSON.stringify({ product: "Soda", change: [20, 20] }),
);

console.log(
  JSON.stringify(vendingMachine(products, 250, 2)) ===
    JSON.stringify({ product: "Soda", change: [50] }),
);

console.log(
  JSON.stringify(vendingMachine(products, 260, 2)) ===
    JSON.stringify({ product: "Soda", change: [50, 10] }),
);

console.log(
  JSON.stringify(vendingMachine(products, 270, 2)) ===
    JSON.stringify({ product: "Soda", change: [50, 20] }),
);

console.log(
  JSON.stringify(vendingMachine(products, 280, 2)) ===
    JSON.stringify({ product: "Soda", change: [50, 20, 10] }),
);

console.log(
  JSON.stringify(vendingMachine(products, 290, 2)) ===
    JSON.stringify({ product: "Soda", change: [50, 20, 20] }),
);

console.log(
  JSON.stringify(vendingMachine(products, 300, 2)) ===
    JSON.stringify({ product: "Soda", change: [100] }),
);

console.log(
  JSON.stringify(vendingMachine(products, 400, 2)) ===
    JSON.stringify({ product: "Soda", change: [200] }),
);

console.log(
  JSON.stringify(vendingMachine(products, 700, 2)) ===
    JSON.stringify({ product: "Soda", change: [500] }),
);

// No change
console.log(
  JSON.stringify(vendingMachine(products, 100, 1)) ===
    JSON.stringify({ product: "Orange juice", change: [] }),
);

// invalid productNumber
console.log(
  vendingMachine(products, 500, 0) === "Enter a valid product number",
);

console.log(
  vendingMachine(products, 500, -1) === "Enter a valid product number",
);

console.log(
  vendingMachine(products, 500, -10) === "Enter a valid product number",
);

console.log(
  vendingMachine(products, 500, 10) === "Enter a valid product number",
);

// not enough money
console.log(
  vendingMachine(products, 90, 1) === "Not enough money for this product",
);

console.log(
  vendingMachine(products, 99, 1) === "Not enough money for this product",
);

console.log(
  vendingMachine(products, 0, 1) === "Not enough money for this product",
);

console.log(
  vendingMachine(products, -1, 1) === "Not enough money for this product",
);
