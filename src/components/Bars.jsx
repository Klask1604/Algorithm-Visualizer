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
  const [Speed, setSpeed] = useState(110);
  const [length, setLength] = useState(30);
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
    const arrayLength = Math.floor(Math.random() * (length - 10 + 1)) + 10;
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
    await bubbleSort(barsArray, setBarsArray, stopSortingRef, Speed);
    setIsSorting(false);
  };

  const sortBarsInsertion = async () => {
    setIsSorting(true);
    stopSortingRef.current = false;
    await insertionSort(barsArray, setBarsArray, stopSortingRef, Speed);
    setIsSorting(false);
  };
  const sortBarsSelection = async () => {
    setIsSorting(true);
    stopSortingRef.current = false;
    await selectionSort(barsArray, setBarsArray, stopSortingRef, Speed);
    setIsSorting(false);
  };
  const sortBarsRadix = async () => {
    setIsSorting(true);
    stopSortingRef.current = false;
    await radixSort(barsArray, setBarsArray, stopSortingRef, Speed);
    setIsSorting(false);
  };
  useImperativeHandle(ref, () => ({
    generateBarsArray,
    sortBarsBubble: async () => {
      setIsSorting(true);
      stopSortingRef.current = false;
      await bubbleSort(barsArray, setBarsArray, stopSortingRef, Speed);
      setIsSorting(false);
    },
    sortBarsInsertion: async () => {
      setIsSorting(true);
      stopSortingRef.current = false;
      await insertionSort(barsArray, setBarsArray, stopSortingRef, Speed);
      setIsSorting(false);
    },
    sortBarsSelection: async () => {
      setIsSorting(true);
      stopSortingRef.current = false;
      await selectionSort(barsArray, setBarsArray, stopSortingRef, Speed);
      setIsSorting(false);
    },
    sortBarsRadix: async () => {
      setIsSorting(true);
      stopSortingRef.current = false;
      await radixSort(barsArray, setBarsArray, stopSortingRef, Speed);
      setIsSorting(false);
    },
  }));

  const handleStopSort = () => {
    stopSortingRef.current = true;
    setIsSorting(false);
  };

  const getSpeedText = (Speed) => {
    switch (Speed) {
      case 10:
        return "Very Fast";
      case 60:
        return "Fast";
      case 110:
        return "Normal";
      case 160:
        return "Slow";
      case 210:
        return "Very Slow";
      default:
        return "Unknown Speed";
    }
  };
  const speedText = getSpeedText(Speed);

  const getLength = (length) => {
    switch (length) {
      case 20:
        return "Small";
      case 30:
        return "Normal";
      case 40:
        return "Biggest of em' all";
    }
  };
  const lengthText = getLength(length);
  return (
    <>
      <div className="visualizer">
        <div className="controller">
          <div className="Speed">
            <p style={{ marginBottom: "10px" }}>Adjust speed</p>
            <p>{speedText}</p>
            <input
              type="range"
              min="10"
              max="210"
              step="50"
              value={Speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
            ></input>
          </div>
          <div className="Length">
            <p style={{ marginBottom: "10px" }}>Adjust length</p>
            <p>{lengthText}</p>
            <input
              type="range"
              min="20"
              max="40"
              step="10"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
            ></input>
          </div>
        </div>

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
