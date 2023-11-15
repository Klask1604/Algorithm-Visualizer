async function selectionSort(array, setBarsArray, StopSort) {
  let bars = [...array];

  for (let i = 0; i < bars.length - 1; i++) {
    let minIndex = i;
    bars[minIndex].isComparing = true;

    for (let j = i + 1; j < bars.length; j++) {
      bars[j].isComparing = true;
      setBarsArray([...bars]);

      await new Promise((resolve) => setTimeout(resolve, 100));

      if (bars[j].value < bars[minIndex].value) {
        if (minIndex !== i) {
          bars[minIndex].isComparing = false;
        }
        minIndex = j;
        bars[minIndex].isComparing = true;
      } else {
        bars[j].isComparing = false;
      }

      if (StopSort.current) {
        setBarsArray([...bars]);
        return;
      }
    }

    if (minIndex !== i) {
      bars[minIndex].isSwapping = true;
      bars[i].isSwapping = true;

      let temp = bars[minIndex];
      bars[minIndex] = bars[i];
      bars[i] = temp;

      setBarsArray([...bars]);

      await new Promise((resolve) => setTimeout(resolve, 100));

      bars[minIndex].isSwapping = false;
      bars[i].isSwapping = false;
    }

    bars[i].isComparing = false;
    bars[i].isSorted = true;
  }

  bars[bars.length - 1].isSorted = true;
  setBarsArray([...bars]);

  return bars;
}

export default selectionSort;
