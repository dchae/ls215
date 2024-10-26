let minMaxGetterMaker = function () {
  let res = { min: Infinity, max: -Infinity };
  let get = function (value) {
    if (value >= res.max) {
      res.max = value;
    }

    if (value <= res.min) {
      res.min = value;
    }
  };

  res.get = get;
  return res;
};

let getMinMax = minMaxGetterMaker();
console.log(getMinMax);

[4, 5, 12, 23, 3].forEach(getMinMax.get);

console.log(getMinMax);

// 3 23
