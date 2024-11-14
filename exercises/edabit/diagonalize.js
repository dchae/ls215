"use strict";

function rotateGrid(grid) {
  return grid.map((row, i) => row.map((_, j) => grid[grid.length - 1 - j][i]));
}

function makeGrid(n) {
  let grid = [];

  for (let i = 0; i < n; i++) {
    let row = [];
    for (let val = i; val < i + n; val++) {
      row.push(val);
    }
    grid.push(row);
  }

  return grid;
}

function diagonalize(n, corner) {
  let grid = makeGrid(n);

  let rotations = ["ul", "ur", "lr", "ll"].indexOf(corner);

  for (let i = 0; i < rotations; i++) {
    grid = rotateGrid(grid);
  }

  return grid;
}

console.log(diagonalize(3, "ul"));
console.log(diagonalize(3, "ur"));
console.log(diagonalize(3, "ll"));
console.log(diagonalize(3, "lr"));
console.log(diagonalize(4, "ur"));
console.log(diagonalize(5, "lr"));
