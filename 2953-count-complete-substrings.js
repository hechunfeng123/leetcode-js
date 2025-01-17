/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var countCompleteSubstrings = function (word, k) {
  let w = word
  function calc(s) {
    let res = 0;
    let v = s.length;
    for (let i = 1; i < 27; i++) {
      if (i * k > v) break;
      let l = i * k;
      let len = i * k
      let cnt = {};
      for (let j = 0; j < l; j++) {
        if (cnt[s[j]] == null) {
          cnt[s[j]] = 0;
        }
        cnt[s[j]]++
      }
      let freq = {};
      for (let key in cnt) {
        if (freq[cnt[key]] == null) {
          freq[cnt[key]] = 0;
        }
        freq[cnt[key]]++;
      }
      // console.log(freq)

      if (freq[k] === i) res++;
      for (let idx = 0; idx < v - len; idx++) {
        if (cnt[s[idx]] == null) cnt[s[idx]] = 0
        if (freq[cnt[s[idx]]] == null) freq[cnt[s[idx]]] = 0
        freq[cnt[s[idx]]]--;
        cnt[s[idx]]--;
        if (freq[cnt[s[idx]]] == null) freq[cnt[s[idx]]] = 0
        freq[cnt[s[idx]]]++;

        if (cnt[s[idx + len]] == null) cnt[s[idx + len]] = 0
        if (freq[cnt[s[idx + len]]] == null) freq[cnt[s[idx + len]]] = 0
        freq[cnt[s[idx + len]]]--;
        cnt[s[idx + len]]++;
        if (freq[cnt[s[idx + len]]] == null) freq[cnt[s[idx + len]]] = 0
        freq[cnt[s[idx + len]]]++;
        if (freq[k] === i) res++;
      }
      // console.log(res, freq, cnt)
    }
    return res;
  }

  let idx = 0;
  let ans = 0;
  let n = w.length;
  for (let i = 1; i < n; i++) {
    if (Math.abs(w.charCodeAt(i) - w.charCodeAt(i - 1)) > 2) {
      ans += calc(w.slice(idx, i));
      idx = i;
    }
  }
  // console.log(ans, idx)
  ans += calc(w.slice(idx));
  return ans;
};
