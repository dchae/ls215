"use strict";
/*
-- Problem --
Input:
- array of objects representing shopping cart of items
Output:
- number representing the total price after discount
  - sum of price * quantity for each item - discount
    - dicount = 25% of the most expensive item in the cart

Constraints:
args
- will always receive exactly one argument
- argument will always be array

input array
- can be empty
- cannot be sparse
- will always contain only objects
- no object properties

item objects
- will always contain keys: name, quantity, price and no others
  - formatted this way? Yes.
- can there be two items with the same name value? No.
- Are name values case sensitive? Yes.
- can name values be empty strings? No.
- what characters can name values contain? Alphanumeric + space
- will values for quantity and price always be positive Numbers? Yes


Requirements:
- if array argument is empty, return 0;
- "Iphone 20x" and "iPhone 20x" are different items
- round the total down to two decimals

-- Example --
[
  { name: "Iphone 20x", quantity: 1, price: 1350 },
  { name: "Samsung x30", quantity: 1, price: 1225 },
  { name: "Nokia 9250", quantity: 1, price: 800 },
  { name: "Tesla Model Y", quantity: 1, price: 72999 },
]
discount = 72999 * .25
total = 1 * 1350 + 1 * 1225 + 1 * 800 + 1 * 72999 - discount
      = 1 * 1350 + 1 * 1225 + 1 * 800 + 1 * 72999 - 72999 * .25

=> 58124.25,

-- Data Structure --
array of objects
=> total (number), discount (number)
=> total after discount (number, rounded down to two decimals)

-- Algorithm --
1. reduce elements in array to get total
2. get price of most expensive item object
3. calculate discount
4. calculate final total
5. round final total
6. return final total

- Helpers
getTotal(items)
init total
iterate through items, add quantity * price to total
return total

highestItemPrice(items)
init highest
iterate through items, updating highest
return highest

*/

function getTotal(items) {
  return items.reduce(
    (total, { quantity, price }) => total + quantity * price,
    0,
  );
}

function highestItemPrice(items) {
  return items.reduce((best, { price }) => Math.max(best, price), 0);
}

function moneyRound(x) {
  // return Number(String(x).match(/^\d+(\.\d{0,2})?/)[0]);
  return Math.floor(x * 100) / 100;
}

function twentyFiveOnOne(items) {
  const discountPercentage = 0.25;

  let total = getTotal(items);
  let highestPrice = highestItemPrice(items);
  let discount = highestPrice * discountPercentage;

  let discountedTotal = total - discount;
  let finalTotal = moneyRound(discountedTotal);

  return finalTotal;
}

// Test Cases

// Happy path
console.log(
  twentyFiveOnOne([
    { name: "Iphone 20x", quantity: 1, price: 1350 },
    { name: "Samsung x30", quantity: 1, price: 1225 },
    { name: "Nokia 9250", quantity: 1, price: 800 },
    { name: "Tesla Model Y", quantity: 1, price: 72999 },
  ]) === 58124.25,
);

console.log(
  twentyFiveOnOne([
    { name: "jogging pants", quantity: 1, price: 29.99 },
    { name: "tennis socks", quantity: 2, price: 5.99 },
    { name: "sweat shirt", quantity: 1, price: 59.99 },
  ]) === 86.96,
);

// name caps
console.log(
  twentyFiveOnOne([
    { name: "jogging pants", quantity: 1, price: 29.99 },
    { name: "Sweat Shirt", quantity: 2, price: 5.99 },
    { name: "sweat shirt", quantity: 1, price: 59.99 },
  ]) === 86.96,
);

// round down
console.log(
  twentyFiveOnOne([
    { name: "jogging pants", quantity: 1, price: 29.99 },
    { name: "tennis socks", quantity: 2, price: 5.99 },
    { name: "sweat shirt", quantity: 1, price: 50.33 },
  ]) === 79.71, // 79.7175
);

// discount calculate only on one item
console.log(
  twentyFiveOnOne([
    { name: "jogging pants", quantity: 1, price: 10 },
    { name: "tennis socks", quantity: 2, price: 20 },
    { name: "sweat shirt", quantity: 1, price: 10 },
  ]) === 55,
);

// ties for most expensive item
console.log(
  twentyFiveOnOne([
    { name: "jogging pants", quantity: 1, price: 20 },
    { name: "tennis socks", quantity: 2, price: 20 },
    { name: "sweat shirt", quantity: 1, price: 10 },
  ]) === 65,
);

// empty cart
console.log(twentyFiveOnOne([]) === 0);

// one item
console.log(
  twentyFiveOnOne([{ name: "jogging pants", quantity: 1, price: 10 }]) === 7.5,
);

// one item quantity two
console.log(
  twentyFiveOnOne([{ name: "jogging pants", quantity: 2, price: 10 }]) === 17.5,
);
