"use strict";

function queenAttack(boardStr) {
  const BOARD_WIDTH = 8;
  const BOARD_HEIGHT = 8;

  boardStr = boardStr.replace(/\n/g, "");

  const whiteIndex = boardStr.indexOf("W");
  const blackIndex = boardStr.indexOf("B");

  if (whiteIndex === -1 || blackIndex === -1) {
    return undefined;
  }

  const whiteRow = Math.floor(whiteIndex / BOARD_WIDTH);
  const whiteCol = whiteIndex % BOARD_HEIGHT;
  const blackRow = Math.floor(blackIndex / BOARD_WIDTH);
  const blackCol = blackIndex % BOARD_HEIGHT;

  if (whiteRow === blackRow || whiteCol === blackCol) return true;

  if (Math.abs(whiteRow - blackRow) === Math.abs(whiteCol - blackCol)) {
    return true;
  }

  return false;
}

const tests = [
  {
    input:
      "________\n" +
      "________\n" +
      "___W____\n" +
      "________\n" +
      "________\n" +
      "______B_\n" +
      "________\n" +
      "________\n",
    expected: true,
  },
  {
    input:
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "_B______\n" +
      "W_______\n",
    expected: true,
  },
  {
    input:
      "B______W\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n",
    expected: true,
  },
  {
    input:
      "________\n" +
      "________\n" +
      "________\n" +
      "W_______\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "B_______\n",
    expected: true,
  },
  {
    input:
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "______BW\n",
    expected: true,
  },
  {
    input:
      "________\n" +
      "___B____\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "___W____\n" +
      "________\n",
    expected: true,
  },
  {
    input:
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "___W____\n" +
      "_B______\n" +
      "________\n",
    expected: false,
  },
  {
    input:
      "________\n" +
      "__B_____\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "____W___\n" +
      "________\n",
    expected: false,
  },
  {
    input:
      "________\n" +
      "________\n" +
      "________\n" +
      "__B_____\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n",
    expected: undefined,
  },
  {
    input:
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "_______W\n",
    expected: undefined,
  },
  {
    input:
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n" +
      "________\n",
    expected: undefined,
  },
];

tests.forEach((test) => console.log(queenAttack(test.input) === test.expected));
