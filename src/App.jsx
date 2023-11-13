import { useState, useRef } from "react";
import Bars from "./components/Bars";
function App() {
  const barsRef = useRef();
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = async (buttonName) => {
    setActiveButton(buttonName);

    if (buttonName === "Generate a new array") {
      barsRef.current.generateBarsArray();
    } else if (buttonName === "BubbleSort") {
      barsRef.current.bubbleSort();
    } else if (buttonName === "Insertion") {
      barsRef.current.insertionSort();
    } else if (buttonName === "Selection") {
      barsRef.current.selectionSort();
    } else if (buttonName === "Radix") {
      barsRef.current.radixSort();
    }
  };
  return (
    <>
      <div className="navbar">
        <h1>ALGVIS</h1>
        <div className="btns">
          <button
            style={{
              backgroundColor:
                activeButton === "Generate a new array" ? "#FF7043" : "#E64A19",
              color: "white",
            }}
            onClick={() => {
              handleButtonClick("Generate a new array");
            }}
          >
            Generate a new array
          </button>

          <button
            style={{
              backgroundColor:
                activeButton === "bubbleSort" ? "#FF7043" : "#E64A19",
              color: "white",
            }}
            onClick={() => handleButtonClick("BubbleSort")}
          >
            BubbleSort
          </button>
          <button
            style={{
              backgroundColor:
                activeButton === "Selection" ? "#FF7043" : "#E64A19",
              color: "white",
            }}
            onClick={() => handleButtonClick("Selection")}
          >
            Selection
          </button>
          <button
            style={{
              backgroundColor:
                activeButton === "Insertion" ? "#FF7043" : "#E64A19",
              color: "white",
            }}
            onClick={() => handleButtonClick("Insertion")}
          >
            Insertion
          </button>
          <button
            style={{
              backgroundColor: activeButton === "Radix" ? "#FF7043" : "#E64A19",
              color: "white",
            }}
            onClick={() => handleButtonClick("Radix")}
          >
            Radix
          </button>
        </div>
      </div>
      <Bars ref={barsRef} />
    </>
  );
}

export default App;
