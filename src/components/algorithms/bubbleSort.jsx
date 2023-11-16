import swapBars from "../utils/swap";

const bubbleSort = async (array, updateStateCallback, StopSort, Speed) => {
  const newArray = [...array];

  for (let i = 0; i < newArray.length - 1; i++) {
    if (StopSort.current) return;
    for (let j = 0; j < newArray.length - i - 1; j++) {
      if (StopSort.current) return;
      newArray[j].isSorted = false;
      newArray[j + 1].isSorted = false;

      newArray[j].isSwapping = true;
      newArray[j + 1].isSwapping = true;

      if (newArray[j].value > newArray[j + 1].value) {
        swapBars(newArray, j, j + 1);
      }

      await new Promise((resolve) => setTimeout(resolve, Speed));

      newArray[j].isSwapping = false;
      newArray[j + 1].isSwapping = false;

      updateStateCallback([...newArray]);
    }

    newArray[newArray.length - i - 1].isSorted = true;

    await new Promise((resolve) => setTimeout(resolve, Speed));

    updateStateCallback([...newArray]);
  }
  if (StopSort.current) {
    setIsSorting(false);
    return;
  }
  updateStateCallback((prevArray) =>
    prevArray.map((bar, index) => ({
      ...bar,
      isSorted: true,
      isSwapping: false,
    }))
  );
};

export default bubbleSort;
