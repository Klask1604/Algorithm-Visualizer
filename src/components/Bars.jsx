import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

import { bubbleSort, stopBubbleSort } from "./algorithms/bubbleSort";
import insertionSort from "./algorithms/insertionSort";
import radixSort from "./algorithms/radixSort";
import selectionSort from "./algorithms/selectionSort";

const Bars = forwardRef((props, ref) => {
  const [barsArray, setBarsArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    generateBarsArray();
  }, []);

  const generateBarsArray = () => {
    const arrayLength = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    const newArray = Array.from(
      { length: arrayLength },
      () => Math.floor(Math.random() * (100 - 20 + 1)) + 20
    );

    setBarsArray(
      newArray.map((value) => ({
        value,
        isComparing: false,
        isSwapping: false,
      }))
    );
  };

  const sortBarsBubble = async () => {
    setIsSorting(true);
    await bubbleSort(barsArray, setBarsArray);
    setIsSorting(false);
  };

  const sortBarsInsertion = () => {
    setIsSorting(true);
    insertionSort(barsArray, setBarsArray);
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
    sortBarsBubble: async () => {
      setIsSorting(true);
      await bubbleSort(barsArray, setBarsArray);
      setIsSorting(false);
      setStopSorting(false);
    },
    sortBarsInsertion: () => {
      setIsSorting(true);
      insertionSort(barsArray, setBarsArray);
    },
    sortBarsSelection: () => {
      setIsSorting(true);
      selectionSort(barsArray, setBarsArray);
    },
    sortBarsRadix: async () => {
      setIsSorting(true);
      await radixSort(barsArray, setBarsArray);
      setIsSorting(false);
    },
  }));

  const handleStopButtonClick = () => {
    stopBubbleSort();
  };

  return (
    <>
      <div className="visualizer">
        <div className="box-bars">
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

        <button onClick={handleStopButtonClick}>
          <span>STOP</span>
          <i></i>
        </button>
      </div>
    </>
  );
});

export default Bars;
