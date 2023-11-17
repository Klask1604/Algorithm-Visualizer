import { useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sorting from "./components/Sorting";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Pathfinder from "./components/pathfinder/Pathfinder";
function App() {
  const barsRef = useRef();
  const [activeButton, setActiveButton] = useState(null);
  const [ButtontDisable, setButtonDisable] = useState(false);
  const [Display, setDisplay] = useState();
  const handleSortingState = (sorting) => {
    setButtonDisable(sorting);
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
      <BrowserRouter basename="/Algorithm-Visualizer">
        {/* <Navbar
          activeButton={activeButton}
          ButtonSortDisable={ButtonSortDisable}
          handleButtonClick={handleButtonClick}
        /> */}
        <Home />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/sorting"
            element={
              <>
                <Navbar
                  activeButton={activeButton}
                  ButtontDisable={ButtontDisable}
                  handleButtonClick={handleButtonClick}
                />
                <Sorting
                  ref={barsRef}
                  onSortingStateChange={handleSortingState}
                />
              </>
            }
          />
          <Route
            path="/pathfinder"
            element={
              <>
                <Navbar
                  activeButton={activeButton}
                  ButtontDisable={ButtontDisable}
                  handleButtonClick={handleButtonClick}
                />
                <Pathfinder />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
