const insertionSort = async (array, updateStateCallback) => {
  const newArray = [...array];

  for (let i = 1; i < newArray.length; i++) {
    let key = newArray[i].value;
    let j = i - 1;

    while (j >= 0 && newArray[j].value > key) {
      newArray[j + 1].isSwapping = true;
      newArray[j + 1].isSorted = false;
      newArray[j + 1].value = newArray[j].value;

      updateStateCallback([...newArray]);
      await new Promise((resolve) => setTimeout(resolve, 100));

      newArray[j + 1].isSwapping = false;
      newArray[j + 1].isSorted = true;

      updateStateCallback([...newArray]);

      j = j - 1;
    }

    newArray[j + 1].value = key;
  }

  updateStateCallback((prevArray) =>
    prevArray.map((bar) => ({
      ...bar,
      isSorted: true,
      isSwapping: false,
    }))
  );
};

export default insertionSort;
