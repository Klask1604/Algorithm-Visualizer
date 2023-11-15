import { useState, useRef } from "react";
import Bars from "./components/Bars";
function App() {
  const barsRef = useRef();
  const [activeButton, setActiveButton] = useState(null);
  const [ButtonSortDisable, setButtonSortDisable] = useState(false);

  const handleSortingState = (sorting) => {
    setButtonSortDisable(sorting);
    console.log(sorting);
  };

  const handleButtonClick = async (buttonName) => {
    setActiveButton(buttonName);

    if (buttonName === "Generate a new array") {
      barsRef.current.generateBarsArray();
    } else if (buttonName === "BubbleSort") {
      barsRef.current.sortBarsBubble();
    } else if (buttonName === "Insertion") {
      barsRef.current.sortBarsInsertion();
    } else if (buttonName === "Selection") {
      barsRef.current.sortBarsSelection();
    } else if (buttonName === "Radix") {
      await barsRef.current.sortBarsRadix();
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="title">
          <h1>ALGVIS</h1>
        </div>
        <div className="btns">
          <button
            disabled={ButtonSortDisable}
            style={{
              backgroundColor:
                activeButton === "Generate a new array" ? "#FF7043" : "#E64A19",
              color: "white",
              opacity: ButtonSortDisable === true ? "30%" : "100%",
              cursor: ButtonSortDisable === true ? "not-allowed" : "pointer",
            }}
            onClick={() => {
              handleButtonClick("Generate a new array");
            }}
          >
            New Array
          </button>

          <button
            disabled={ButtonSortDisable}
            style={{
              backgroundColor:
                activeButton === "BubbleSort" ? "#FF7043" : "#E64A19",
              color: "white",
              opacity: ButtonSortDisable === true ? "30%" : "100%",
              cursor: ButtonSortDisable === true ? "not-allowed" : "pointer",
            }}
            onClick={() => handleButtonClick("BubbleSort")}
          >
            BubbleSort
          </button>
          <button
            disabled={ButtonSortDisable}
            style={{
              backgroundColor:
                activeButton === "Selection" ? "#FF7043" : "#E64A19",
              color: "white",
              opacity: ButtonSortDisable === true ? "30%" : "100%",
              cursor: ButtonSortDisable === true ? "not-allowed" : "pointer",
            }}
            onClick={() => handleButtonClick("Selection")}
          >
            SelectionSort
          </button>
          <button
            disabled={ButtonSortDisable}
            style={{
              backgroundColor:
                activeButton === "Insertion" ? "#FF7043" : "#E64A19",
              color: "white",
              opacity: ButtonSortDisable === true ? "30%" : "100%",
              cursor: ButtonSortDisable === true ? "not-allowed" : "pointer",
            }}
            onClick={() => handleButtonClick("Insertion")}
          >
            InsertionSort
          </button>
          <button
            disabled={ButtonSortDisable}
            style={{
              backgroundColor: activeButton === "Radix" ? "#FF7043" : "#E64A19",
              color: "white",
              opacity: ButtonSortDisable === true ? "30%" : "100%",
              cursor: ButtonSortDisable === true ? "not-allowed" : "pointer",
            }}
            onClick={() => handleButtonClick("Radix")}
          >
            RadixSort
          </button>
        </div>
      </div>

      <Bars ref={barsRef} onSortingStateChange={handleSortingState} />
    </>
  );
}

export default App;
