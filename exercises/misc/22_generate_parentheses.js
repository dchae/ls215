/**
 * @param {number} n
 * @return {string[]}

-- Problem --
Input: integer n, representing pairs of parentheses
Output: all valid combinations of parentheses

Requirements:
- A valid combination is a string for which:
    - each opening parenthesis has one corresponding closing parenthesis
    - each opening parenthesis is eventually closed

-- Examples --
1: ["()"]
    [0, 1] => opening parenthesis can only be in one position
2: ["(())","()()"]
    [0, 1, 2, 3]
 => [0, 1], [0, 2] => opening parentheses can be in two sets of positions
3: ["((()))","(()())","(())()","()(())","()()()"]
    [0, 1, 2, 3, 4, 5]
 => [0, 1, 2],
    [0, 1, 3],
    [0, 1, 4],
    [0, 2, 3],
    [0, 2, 4],
    => opening parenthesis can be in 5 sets of positions

-- algo --
1. generate all positions the opening parentheses can be in
2. create the strings
3. return the strings

1. init positions = []
2. for (i in range(1, n*2-i)):
  - init position = [0]
  - position << i

*/

var generateParenthesis = function (n) {
  if (n === 1) return ["()"];
};
