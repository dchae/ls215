"use strict";

let rectangles = [
  [3, 4],
  [6, 6],
  [1, 8],
  [9, 9],
  [2, 2],
];

function totalArea(areas) {
  return areas.reduce((acc, [height, width]) => acc + height * width, 0);
}

console.log(totalArea(rectangles)); // 141

function totalSquareArea(rectangles) {
  const squares = rectangles.filter(([height, width]) => height === width);

  return totalArea(squares);
}
console.log(totalSquareArea(rectangles)); // 121
