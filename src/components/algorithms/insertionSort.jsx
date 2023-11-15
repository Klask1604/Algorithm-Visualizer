async function insertionSort(array, setBarsArray, StopSort) {
  let bars = [...array];

  for (let i = 1; i < bars.length; i++) {
    if (StopSort.current) return;
    let key = bars[i];
    key.isComparing = true;
    let j = i - 1;

    while (j >= 0 && bars[j].value > key.value) {
      if (StopSort.current) {
        key.isComparing = false;
        setBarsArray([...bars]);
        return;
      }

      bars[j].isComparing = true;
      bars[j].isSwapping = true;
      bars[j].isSorted = false;
      key.isSwapping = true;

      setBarsArray([...bars]);

      await new Promise((resolve) => setTimeout(resolve, 100));

      bars[j + 1] = bars[j];

      bars[j].isSwapping = false;
      bars[j].isComparing = false;
      key.isSwapping = false;

      j--;
    }

    key.isComparing = false;
    bars[j + 1] = key;

    for (let k = 0; k <= i; k++) {
      bars[k].isSorted = true;
    }

    setBarsArray([...bars]);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return bars;
}

export default insertionSort;
