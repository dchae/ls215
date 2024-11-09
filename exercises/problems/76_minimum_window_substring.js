// input: two strings; s, t
// output: string

// - return substring of s with the smallest length that
//   contains every character in t (including duplicates)
// - if no such substring, return empty string ("")
// - only one answer

// DS: strings, hash

// Algo:
// init counter hash (tally) for t; t_counter
// init window hash with default value 0; window

// sliding window (two-pointer) iteration through s

// init starting point of window by iterating through s until
// we hit a character that is in t at index i, or we hit end of s

// init right side of window, j, to i

// increase right side of window until window fully contains t or window hits end of s
// if window contains t
//   update res
//   increment i until s[i] in t, while updating window hash

/*
function min_window(s, t)
  return "" if s.empty? || t.empty? || s.length < t.length

  res_range = 0, Float::INFINITY
  t_counter = t.chars.tally
  window = Hash.new(0)
  found_letters = 0

  i = 0
  i += 1 while !t_counter.include?(s[i]) && i < s.length
  j = i

  while j < s.length
    if t_counter.include?(s[j])
      window[s[j]] += 1
      found_letters += 1 if window[s[j]] == t_counter[s[j]]
    end

    while found_letters == t_counter.length
      res_range = [res_range, [i, j]].min_by { |a, z| z - a }
      if t_counter.include?(s[i])
        window[s[i]] -= 1
        found_letters -= 1 if window[s[i]] < t_counter[s[i]]
      end
      i += 1
    end
    j += 1
  end
  res_range[1] > s.length ? "" : s[res_range.first..res_range.last]
end
*/

tests = [
  %w[ADOBECODEBANC ABC],
  %w[
    LKFSADFGKJHLKJASDFBKLEJKLJEHLKJAFBAKLDBKLFEJBKLFEJBSAKLJBFALKJEBFBKLABADOBECODEBANC
    ABCL
  ],
  %w[a a],
  %w[a, aa],
  %w[a b],
  %w[a ab],
]
tests.each { |s, t| p min_window(s, t) }

