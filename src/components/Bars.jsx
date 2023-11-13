import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

const Bars = forwardRef((props, ref) => {
  const [barsArray, setBarsArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    generateBarsArray();
  }, []);

  const generateBarsArray = () => {
    const arrayLength = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
    const newArray = Array.from(
      { length: arrayLength },
      () => Math.floor(Math.random() * (250 - 20 + 1)) + 20
    );

    setBarsArray(
      newArray.map((value) => ({
        value,
        isComparing: false,
        isSwapping: false,
      }))
    );
  };

  const insertionSort = async () => {
    const newArray = [...barsArray];

    for (let i = 1; i < newArray.length; i++) {
      let key = newArray[i].value;
      let j = i - 1;

      while (j >= 0 && newArray[j].value > key) {
        newArray[j + 1].isSwapping = true;
        newArray[j + 1].isSorted = false;
        newArray[j + 1].value = newArray[j].value;

        setBarsArray([...newArray]);
        await new Promise((resolve) => setTimeout(resolve, 100));

        newArray[j + 1].isSwapping = false;
        newArray[j + 1].isSorted = true;

        // Update state and add a delay for animation
        setBarsArray([...newArray]);

        j = j - 1;
      }

      newArray[j + 1].value = key;
    }

    setIsSorting(false);
    setBarsArray((prevArray) =>
      prevArray.map((bar) => ({
        ...bar,
        isSorted: true,
        isSwapping: false,
      }))
    );
  };

  const bubbleSort = async () => {
    const newArray = [...barsArray];

    for (let i = 0; i < newArray.length - 1; i++) {
      for (let j = 0; j < newArray.length - i - 1; j++) {
        newArray[j].isSorted = false;
        newArray[j + 1].isSorted = false;

        newArray[j].isSwapping = true;
        newArray[j + 1].isSwapping = true;

        if (newArray[j].value > newArray[j + 1].value) {
          swapBars(newArray, j, j + 1);
        }

        setBarsArray([...newArray]);
        await new Promise((resolve) => setTimeout(resolve, 20));

        newArray[j].isSwapping = false;
        newArray[j + 1].isSwapping = false;
      }

      newArray[newArray.length - i - 1].isSorted = true;
      setBarsArray([...newArray]);
      await new Promise((resolve) => setTimeout(resolve, 20));
    }

    setIsSorting(false);
    setBarsArray((prevArray) =>
      prevArray.map((bar, index) => ({
        ...bar,
        isSorted: true,
        isSwapping: false,
      }))
    );
  };
  const selectionSort = async () => {
    const newArray = [...barsArray];

    for (let i = 0; i < newArray.length - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < newArray.length; j++) {
        newArray[minIndex].isSwapping = true;
        newArray[j].isComparing = true;

        if (newArray[j].value < newArray[minIndex].value) {
          newArray[minIndex].isSwapping = false;
          minIndex = j;
        }

        setBarsArray([...newArray]);
        await new Promise((resolve) => setTimeout(resolve, 10));

        newArray[j].isComparing = false;
      }

      if (minIndex !== i) {
        swapBars(newArray, i, minIndex);
      }

      newArray[minIndex].isSwapping = false;
      newArray[minIndex].isSorted = true;

      setBarsArray([...newArray]);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    setIsSorting(false);
    setBarsArray((prevArray) =>
      prevArray.map((bar) => ({
        ...bar,
        isSorted: true,
        isSwapping: false,
      }))
    );
  };
  const radixSort = async () => {
    const newArray = [...barsArray];
    const maxVal = Math.max(...newArray.map((bar) => bar.value));

    let exp = 1;
    let isSorting = true;

    const changes = [];

    while (isSorting) {
      isSorting = false;
      const buckets = Array.from({ length: 10 }, () => []);

      for (let i = 0; i < newArray.length; i++) {
        const digit = Math.floor(newArray[i].value / exp) % 10;
        buckets[digit].push(newArray[i]);

        if (!isSorting && digit > 0) {
          isSorting = true;
        }
      }

      exp *= 10;

      newArray.length = 0;
      for (let i = 0; i < buckets.length; i++) {
        newArray.push(...buckets[i]);
      }

      // Accumulate changes for the current pass
      changes.push(
        newArray.map((bar, index) => ({
          ...bar,
          isComparing: true,
        }))
      );

      // Add a delay for animation
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Reset isComparing after the delay
      changes.push(
        newArray.map((bar) => ({
          ...bar,
          isComparing: false,
        }))
      );
    }

    // Set isSorted after the sorting is complete
    changes.push(
      newArray.map((bar, index) => ({
        ...bar,
        isSorted: true,
      }))
    );

    // Apply all accumulated changes
    for (let i = 0; i < changes.length; i++) {
      setBarsArray(changes[i]);
      // Add a delay for animation between passes
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    setIsSorting(false);
  };

  const sortBarsBubble = async () => {
    setIsSorting(true);
    await bubbleSort();
    setIsSorting(false);
  };

  const sortBarsInsertion = () => {
    setIsSorting(true);
    insertionSort();
  };
  const sortBarsSelection = () => {
    setIsSorting(true);
    selectionSort();
  };
  const sortBarsRadix = async () => {
    setIsSorting(true);
    await radixSort();
    setIsSorting(false);
  };
  useImperativeHandle(ref, () => ({
    generateBarsArray,
    sortBarsBubble,
    bubbleSort,
    insertionSort,
    sortBarsInsertion,
    selectionSort,
    sortBarsSelection,
    radixSort,
    sortBarsRadix,
  }));

  const swapBars = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  return (
    <>
      <div className="bars">
        {barsArray &&
          barsArray.map((bar, index) => (
            <p
              key={index}
              className={`bar ${bar.isComparing ? "comparing" : ""} ${
                bar.isSwapping ? "swapping" : ""
              } ${bar.isSorted ? "sorted" : ""}`}
              style={{ height: `${bar.value * 2}px` }}
            >
              {bar.value}
            </p>
          ))}
      </div>
    </>
  );
});

export default Bars;
