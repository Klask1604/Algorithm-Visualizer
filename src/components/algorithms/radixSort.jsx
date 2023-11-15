function getDigit(num, pos) {
  return Math.floor(Math.abs(num) / Math.pow(10, pos)) % 10;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i].value));
  }
  return maxDigits;
}

async function radixSort(array, setBarsArray, StopSort) {
  let bars = [...array];
  let maxDigitCount = mostDigits(bars);

  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets = Array.from({ length: 10 }, () => []);

    for (let i = 0; i < bars.length; i++) {
      if (StopSort.current) {
        setBarsArray([...bars]);
        return;
      }

      let digit = getDigit(bars[i].value, k);
      digitBuckets[digit].push(bars[i]);

      // Mark as 'comparing' during bucketing
      bars[i].isComparing = true;
      setBarsArray([...bars]);
      await new Promise((resolve) => setTimeout(resolve, 100));
      bars[i].isComparing = false;
    }

    bars = [].concat(...digitBuckets);

    // Mark all as 'swapping' during reassignment from buckets
    for (let i = 0; i < bars.length; i++) {
      bars[i].isSwapping = true;
    }
    setBarsArray([...bars]);
    await new Promise((resolve) => setTimeout(resolve, 100));
    for (let i = 0; i < bars.length; i++) {
      bars[i].isSwapping = false;
    }
  }

  // Mark all as sorted at the end
  for (let i = 0; i < bars.length; i++) {
    bars[i].isSorted = true;
  }
  setBarsArray([...bars]);

  return bars;
}

export default radixSort;
