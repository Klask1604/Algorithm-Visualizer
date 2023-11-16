import { useState, useRef } from "react";
import Bars from "./components/Bars";
import Navbar from "./components/Navbar";
function App() {
  const barsRef = useRef();
  const [activeButton, setActiveButton] = useState(null);
  const [ButtonSortDisable, setButtonSortDisable] = useState(false);

  const handleSortingState = (sorting) => {
    setButtonSortDisable(sorting);
  };

  const handleButtonClick = async (buttonName) => {
    setActiveButton(buttonName);

    if (buttonName === "Generate a new array") {
      barsRef.current.generateBarsArray();
    } else if (buttonName === "Bubble") {
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
      {/* <div className="navbar">
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
            Generate New
          </button>

          <button
            disabled={ButtonSortDisable}
            style={{
              backgroundColor:
                activeButton === "Bubble" ? "#FF7043" : "#E64A19",
              color: "white",
              opacity: ButtonSortDisable === true ? "30%" : "100%",
              cursor: ButtonSortDisable === true ? "not-allowed" : "pointer",
            }}
            onClick={() => handleButtonClick("Bubble")}
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
      </div> */}
      <Navbar
        activeButton={activeButton}
        ButtonSortDisable={ButtonSortDisable}
        handleButtonClick={handleButtonClick}
      />
      <Bars ref={barsRef} onSortingStateChange={handleSortingState} />
    </>
  );
}

export default App;
