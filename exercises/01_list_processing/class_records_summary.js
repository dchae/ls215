"use strict";

let studentScores = {
  student1: {
    id: 123456789,
    scores: {
      exams: [90, 95, 100, 80],
      exercises: [20, 15, 10, 19, 15],
    },
  },
  student2: {
    id: 123456799,
    scores: {
      exams: [50, 70, 90, 100],
      exercises: [0, 15, 20, 15, 15],
    },
  },
  student3: {
    id: 123457789,
    scores: {
      exams: [88, 87, 88, 89],
      exercises: [10, 20, 10, 19, 18],
    },
  },
  student4: {
    id: 112233445,
    scores: {
      exams: [100, 100, 100, 100],
      exercises: [10, 15, 10, 10, 15],
    },
  },
  student5: {
    id: 112233446,
    scores: {
      exams: [50, 80, 60, 90],
      exercises: [10, 0, 10, 10, 0],
    },
  },
};

// input: object containing student objects
// output: object containing arrays

const EXAM_WEIGHT = 0.65;
const EXERCISE_WEIGHT = 0.35;
const EXAM_COUNT = 4;

function letterGrade(percent) {
  if (percent >= 93) return "A";
  if (percent >= 85) return "B";
  if (percent >= 77) return "C";
  if (percent >= 69) return "D";
  if (percent >= 60) return "E";
  return "F";
}

function calculateGrade({ exams, exercises }) {
  const averageExamScore = exams.reduce((a, b) => a + b) / exams.length;
  const totalExerciseScore = exercises.reduce((a, b) => a + b);

  const finalPercentGrade =
    averageExamScore * EXAM_WEIGHT + totalExerciseScore * EXERCISE_WEIGHT;

  return Math.round(finalPercentGrade);
}

function calculateExamStatistics(scores) {
  return Array(EXAM_COUNT)
    .fill(0)
    .map((_, i) => {
      const examScores = Object.values(scores).map(
        (student) => student.scores.exams[i],
      );
      let average = examScores.reduce((a, b) => a + b) / examScores.length;
      average = Math.round(average * 10) / 10;
      const minimum = Math.min(...examScores);
      const maximum = Math.max(...examScores);

      return { average, minimum, maximum };
    });
}

function generateClassRecordSummary(scores) {
  const studentPercentGrades = Object.values(scores).map(({ scores }) => {
    return calculateGrade(scores);
  });

  const studentGrades = studentPercentGrades.map(
    (percentGrade) => `${percentGrade} (${letterGrade(percentGrade)})`,
  );

  const exams = calculateExamStatistics(scores);

  return { studentGrades, exams };
}

const summary = generateClassRecordSummary(studentScores);
console.log(summary);

// returns:
// {
//   studentGrades: [ '87 (B)', '73 (D)', '84 (C)', '86 (B)', '56 (F)' ],
//   exams: [
//     { average: 75.6, minimum: 50, maximum: 100 },
//     { average: 86.4, minimum: 70, maximum: 100 },
//     { average: 87.6, minimum: 60, maximum: 100 },
//     { average: 91.8, minimum: 80, maximum: 100 },
//   ],
// }
