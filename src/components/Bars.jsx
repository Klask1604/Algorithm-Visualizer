import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

import bubbleSort from "./algorithms/bubbleSort";
import insertionSort from "./algorithms/insertionSort";
import radixSort from "./algorithms/radixSort";
import selectionSort from "./algorithms/selectionSort";

const Bars = forwardRef(({ onSortingStateChange }, ref) => {
  const [barsArray, setBarsArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const stopSortingRef = useRef(false);

  useEffect(() => {
    if (onSortingStateChange) {
      onSortingStateChange(isSorting);
    }
  }, [isSorting, onSortingStateChange]);

  useEffect(() => {
    generateBarsArray();
  }, []);

  const generateBarsArray = () => {
    const arrayLength = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
    const newArray = Array.from(
      { length: arrayLength },
      () => Math.floor(Math.random() * (99 - 5 + 1)) + 20
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
    stopSortingRef.current = false;
    await bubbleSort(barsArray, setBarsArray, stopSortingRef);
    setIsSorting(false);
  };

  const sortBarsInsertion = async () => {
    setIsSorting(true);
    stopSortingRef.current = false;
    await insertionSort(barsArray, setBarsArray, stopSortingRef);
    setIsSorting(false);
  };
  const sortBarsSelection = async () => {
    setIsSorting(true);
    stopSortingRef.current = false;
    await selectionSort(barsArray, setBarsArray, stopSortingRef);
    setIsSorting(false);
  };
  const sortBarsRadix = async () => {
    setIsSorting(true);
    stopSortingRef.current = false;
    await radixSort(barsArray, setBarsArray, stopSortingRef);
    setIsSorting(false);
  };
  useImperativeHandle(ref, () => ({
    generateBarsArray,
    sortBarsBubble: async () => {
      setIsSorting(true);
      stopSortingRef.current = false;
      await bubbleSort(barsArray, setBarsArray, stopSortingRef);
      setIsSorting(false);
    },
    sortBarsInsertion: async () => {
      setIsSorting(true);
      stopSortingRef.current = false;
      await insertionSort(barsArray, setBarsArray, stopSortingRef);
      setIsSorting(false);
    },
    sortBarsSelection: async () => {
      setIsSorting(true);
      stopSortingRef.current = false;
      await selectionSort(barsArray, setBarsArray, stopSortingRef);
      setIsSorting(false);
    },
    sortBarsRadix: async () => {
      setIsSorting(true);
      stopSortingRef.current = false;
      await radixSort(barsArray, setBarsArray, stopSortingRef);
      setIsSorting(false);
    },
  }));

  const handleStopSort = () => {
    stopSortingRef.current = true;
    setIsSorting(false);
  };
  return (
    <>
      <div className="visualizer">
        <div className="controller"></div>
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
        <div className="stopbtn">
          <button onClick={handleStopSort}>
            <span>STOP</span>
            <i></i>
          </button>
        </div>
      </div>
    </>
  );
});

export default Bars;
