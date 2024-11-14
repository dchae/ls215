"use strict";

function merge(arr1, arr2) {
  let res = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length || j < arr2.length) {
    let option1 = arr1[i];
    let option2 = arr2[j];

    if (option2 === undefined || option1 < option2) {
      res.push(option1);
      i++;
    } else {
      res.push(option2);
      j++;
    }
  }

  console.log(res);
  return res;
}

merge([1, 5, 9], [2, 6, 8]); // [1, 2, 5, 6, 8, 9]
merge([1, 1, 3], [2, 2]); // [1, 1, 2, 2, 3]
merge([], [1, 4, 5]); // [1, 4, 5]
merge([1, 4, 5], []); // [1, 4, 5]
