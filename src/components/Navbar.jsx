import { useLocation, useNavigate } from "react-router-dom";
function Navbar({ activeButton, ButtontDisable, handleButtonClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const ButtonMap = location.pathname.includes("/sorting")
    ? ["Generate a new array", "Bubble", "Insertion", "Selection", "Radix"]
    : location.pathname.includes("/pathfinder")
    ? ["Generate a new map", "A*", "Djiksatra's", "Maximum Flow"]
    : [];
  return (
    <div className="navbar">
      <div className="title">
        <h1>
          {location.pathname.includes("/sorting") ? "Sorting" : "Pathfinder"}
        </h1>
      </div>
      <div className="btns">
        <button onClick={() => navigate("/")}>Home</button>
        {ButtonMap.map((number, index) => (
          <button
            key={index}
            disabled={ButtontDisable}
            style={{
              backgroundColor:
                activeButton === `Button${number}` ? "#FF7043" : "#E64A19",
              color: "white",
              opacity: ButtontDisable ? "30%" : "100%",
              cursor: ButtontDisable ? "not-allowed" : "pointer",
            }}
            onClick={() => handleButtonClick(`Button${number}`)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
