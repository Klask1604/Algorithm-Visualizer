import swapBars from "./swap";

let stopSorting = false;

const bubbleSort = async (array, updateStateCallback) => {
  stopSorting = false;
  const newArray = [...array];

  for (let i = 0; i < newArray.length - 1; i++) {
    for (let j = 0; j < newArray.length - i - 1; j++) {
      if (stopSorting) {
        return;
      }

      newArray[j].isSorted = false;
      newArray[j + 1].isSorted = false;

      newArray[j].isSwapping = true;
      newArray[j + 1].isSwapping = true;

      if (newArray[j].value > newArray[j + 1].value) {
        swapBars(newArray, j, j + 1);
      }

      await new Promise((resolve) => setTimeout(resolve, 20));

      newArray[j].isSwapping = false;
      newArray[j + 1].isSwapping = false;

      updateStateCallback([...newArray]);
    }

    newArray[newArray.length - i - 1].isSorted = true;

    await new Promise((resolve) => setTimeout(resolve, 20));

    updateStateCallback([...newArray]);
  }

  updateStateCallback((prevArray) =>
    prevArray.map((bar, index) => ({
      ...bar,
      isSorted: true,
      isSwapping: false,
    }))
  );
};

const stopBubbleSort = () => {
  stopSorting = true;
};

export { bubbleSort, stopBubbleSort };
