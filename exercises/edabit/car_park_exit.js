"use strict";
function findStartPos(floors) {
  let i = 0;
  let j = 0;
  for (i; i < floors.length; i++) {
    let floor = floors[i];
    for (j; j < floor.length; j++) {
      if (floor[j] === 2) return [i, j];
    }
  }
  return -1;
}

function findStaircase(floors, i, j, path) {
  let floor = floors[i];
  let offset = 0;
  while (floor[j] !== 1 && (j - offset >= 0 || j + offset < floor.length)) {
    if (floor[j - offset] === 1) {
      path.push("L" + offset);
      return [i, j - offset];
    }
    if (floor[j + offset] === 1) {
      path.push("R" + offset);
      return [i, j + offset];
    }
    offset++;
  }
  return [i, j];
}

function descendStaircase(floors, i, j, path) {
  let vertOffset = 0;
  while (floors[i + vertOffset][j] === 1) {
    vertOffset++;
  }

  path.push("D" + vertOffset);
  return [i + vertOffset, j];
}

function parkingExit(floors) {
  const END_POS = [floors.length - 1, floors[floors.length - 1].length - 1];

  // find starting position
  let [i, j] = findStartPos(floors);

  // get to bottom floor
  let path = [];
  while (i !== END_POS[0]) {
    //  - expand outward to find staircase and then move down
    [i, j] = findStaircase(floors, i, j, path);
    [i, j] = descendStaircase(floors, i, j, path);
  }

  let distanceToExit = floors[i].length - 1 - j;
  if (distanceToExit > 0) path.push("R" + String(distanceToExit));
  return path;
}

console.log(
  JSON.stringify(
    parkingExit([
      [1, 0, 0, 0, 2],
      [0, 0, 0, 0, 0],
    ]),
  ) === JSON.stringify(["L4", "D1", "R4"]),
);

console.log(
  JSON.stringify(
    parkingExit([
      [2, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0],
    ]),
  ) === JSON.stringify(["R3", "D2", "R1"]),
);

// Starting from 2, move to right 3 times = "R3"
// Go down from stairs 2 steps = "D2"
// Move to right 1 step to exit from right bottom corner = "R1"
console.log(
  JSON.stringify(parkingExit([[0, 0, 0, 0, 2]])) === JSON.stringify([]),
);
