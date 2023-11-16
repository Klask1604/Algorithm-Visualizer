function Navbar({ activeButton, ButtonSortDisable, handleButtonClick }) {
  return (
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
          Generate New
        </button>

        <button
          disabled={ButtonSortDisable}
          style={{
            backgroundColor: activeButton === "Bubble" ? "#FF7043" : "#E64A19",
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
    </div>
  );
}

export default Navbar;
