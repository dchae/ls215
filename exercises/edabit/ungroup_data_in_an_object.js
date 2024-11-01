"use strict";

// input: array of teacher objects
// output: array of student objects
//
// data structure
// input: [teacher1, teacher2, ...]
// teacher1: {teacher: string, data: array}
// data: [student1, student2...]
// student1: {name: string, property: value...}
//
// output: [student1, student2, ...]
// student1: {teacher: string, name: string, property: value, ...}

function ungroupStudents(teachers) {
  return teachers.flatMap(({ teacher, data }) =>
    data.map((studentObject) => ({ teacher, ...studentObject })),
  );
}

let students = [
  {
    teacher: "Ms. Car",
    data: [
      {
        name: "James",
        emergencyNumber: "617-771-1082",
      },
      {
        name: "Alice",
        allergies: ["nuts", "carrots"],
      },
    ],
  },
  {
    teacher: "Mr. Lamb",
    data: [
      {
        name: "Aaron",
        age: 3,
      },
    ],
  },
];

console.log(ungroupStudents(students));
console.log(students);

// Expected:
// [{
//   teacher: "Ms. Car",
//   name: "James",
//   emergencyNumber: "617-771-1082",
// }, {
//   teacher: "Ms. Car",
//   name: "Alice",
//   allergies: ["nuts", "carrots"],
// }, {
//   teacher: "Mr. Lamb",
//   name: "Aaron",
//   age: 3,
// }]
