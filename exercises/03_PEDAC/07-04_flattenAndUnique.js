/*
-- Problem --
Input: 2D (nested) array
Output: flattened array with duplicates removed
Rules:
- treat numbers and number strings (e.g., 1 and '1') as duplicates.
- keep the first duplicate.

- What does "first" mean?
  - left-most in the arguments?
- Will the nested array always be provided?
- Will any extra arguments ever be provided?
- Is there an upper bound to the number of nested arrays?
- Will the elements of the nested arrays always be strings or numbers?
- For the number elements, will they always be integers?
  Or can they be NaN, Infinity, -Infinity, fractionals, etc.?
- If yes, how should we compare these, especially fractionals (1.00),
  fractional strings ('1.00'), integers (1) and integer strings ('1')?
- Confirm that the order of the resulting array is the order of the elements
  in their arrays, from left to right?
- Can the array or nested arrays contain object properties?
  If so, how should I handle those?
- Can the nested arrays be empty? If so, can they just be ignored?
- Can the array or nested arrays be sparse?
*/
