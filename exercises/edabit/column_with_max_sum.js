"use strict";

function colWithMaxSum(array, n) {
  // split array into n-length subarrays
  console.log(array);
  let rows = [...new Array(array.length / n)].map((_, i) =>
    array.slice(i * n, i * n + n),
  );

  console.log(rows);
  // map to sums of columns
  let columns = rows[0].map((_, j) => rows.map((row) => row[j]));
  let sums = columns.map((col) => col.reduce((acc, x) => acc + x));
  let maxIdx = sums.reduce((best, sum, i) => (sum > sums[best] ? i : best), 0);

  return maxIdx + 1;
}

console.log(
  colWithMaxSum([4, 14, 12, 7, 14, 16, 5, 13, 7, 16, 11, 19], 4) === 2,
);
console.log(
  colWithMaxSum([4, 14, 12, 7, 14, 16, 5, 13, 7, 16, 11, 19], 3) === 3,
);
/*
[
  [4,  14, 12],
  [7,  14, 16],
  [5,  13,  7],
  [16, 11, 19],
]

=> [32, 52, 54]
=> 3
*/
