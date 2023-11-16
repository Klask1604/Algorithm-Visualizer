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
