"use strict";

let bands = [
  { name: "sunset rubdown", country: "UK", active: false },
  { name: "women", country: "Germany", active: false },
  { name: "a silver mt. zion", country: "Spain", active: true },
];

function setBandCountry(bands, newCountry) {
  for (let band of bands) {
    band.country = newCountry;
  }
}

function capitalizeBandNames(bands) {
  for (let band of bands) {
    band.name = band.name.replace(/\b([a-z])/gi, (c) => c.toUpperCase());
  }
}

function removeDotsFromBandNames(bands) {
  for (let band of bands) {
    band.name = band.name.replace(".", "");
  }
}

function processBands(data) {
  setBandCountry(data, "Canada");
  capitalizeBandNames(data);
  removeDotsFromBandNames(data);
  return data;
}

processBands(bands);
console.log(bands);

// should return:
// [
//   { name: 'Sunset Rubdown', country: 'Canada', active: false },
//   { name: 'Women', country: 'Canada', active: false },
//   { name: 'A Silver Mt Zion', country: 'Canada', active: true },
// ]
