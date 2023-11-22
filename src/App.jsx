import { useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sorting from "./components/sorting/Sorting";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Pathfinder from "./components/pathfinder/Pathfinder";

function App() {
  const sortingRef = useRef();
  const pathRef = useRef();
  const [activeButton, setActiveButton] = useState(null);
  const [ButtontDisable, setButtonDisable] = useState(false);

  const handleSortingState = (sorting) => {
    setButtonDisable(sorting);
  };

  const handleButtonClick = async (buttonName) => {
    setActiveButton(buttonName);

    if (buttonName === "Generate a new array") {
      sortingRef.current.generateBarsArray();
    } else if (buttonName === "Bubble") {
      sortingRef.current.sortBarsBubble();
    } else if (buttonName === "Insertion") {
      sortingRef.current.sortBarsInsertion();
    } else if (buttonName === "Selection") {
      sortingRef.current.sortBarsSelection();
    } else if (buttonName === "Radix") {
      await sortingRef.current.sortBarsRadix();
    } else if (buttonName === "Generate a new map") {
      pathRef.current.initializeGrid();
    } else if (buttonName === "A*") {
      pathRef.current.visualizePath("Astar");
    } else if (buttonName === "Dijkstra's") {
      pathRef.current.visualizePath("Dijkstra");
    } else if (buttonName === "Deep First Search") {
      pathRef.current.visualizePath("DFS");
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
                  ref={sortingRef}
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
                <Pathfinder ref={pathRef} />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
