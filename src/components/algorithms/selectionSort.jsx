import swapBars from "./swap";
const selectionSort = async (array, updateStateCallback) => {
  const newArray = [...array];

  for (let i = 0; i < newArray.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < newArray.length; j++) {
      newArray[minIndex].isSwapping = true;
      newArray[j].isComparing = true;

      if (newArray[j].value < newArray[minIndex].value) {
        newArray[minIndex].isSwapping = false;
        minIndex = j;
      }

      updateStateCallback([...newArray]);
      await new Promise((resolve) => setTimeout(resolve, 10));

      newArray[j].isComparing = false;
    }

    if (minIndex !== i) {
      swapBars(newArray, i, minIndex);
    }

    newArray[minIndex].isSwapping = false;
    newArray[minIndex].isSorted = true;

    updateStateCallback([...newArray]);
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  updateStateCallback((prevArray) =>
    prevArray.map((bar) => ({
      ...bar,
      isSorted: true,
      isSwapping: false,
    }))
  );
};

export default selectionSort;
