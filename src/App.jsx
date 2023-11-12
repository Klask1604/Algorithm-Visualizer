import { useState } from "react";
import { Bars } from "./components/bars";
function App() {
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
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
            onClick={() => handleButtonClick("Generate a new array")}
          >
            Generate a new array
          </button>

          <button
            style={{
              backgroundColor:
                activeButton === "BubbleSort" ? "#FF7043" : "#E64A19",
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
      <Bars />
    </>
  );
}

export default App;
