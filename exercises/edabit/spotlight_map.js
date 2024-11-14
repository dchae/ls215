"use strict";

function getNeighbours(grid, x, y) {
  let res = grid
    .slice(Math.max(0, x - 1), x + 2)
    .flatMap((row) => row.slice(Math.max(0, y - 1), y + 2));

  return res;
}

function spotlightMap(grid) {
  return grid.map((row, i) =>
    row.map((cell, j) => getNeighbours(grid, i, j).reduce((acc, x) => acc + x)),
  );
}

console.log(
  spotlightMap([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]),
);

console.log(
  spotlightMap([
    [2, 6, 1, 3, 7],
    [8, 5, 9, 4, 0],
  ]),
);
