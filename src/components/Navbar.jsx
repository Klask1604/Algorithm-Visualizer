import { useLocation, useNavigate } from "react-router-dom";
function Navbar({ activeButton, ButtontDisable, handleButtonClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  const ButtonMap = location.pathname.includes("/sorting")
    ? ["Generate a new array", "Bubble", "Insertion", "Selection", "Radix"]
    : location.pathname.includes("/pathfinder")
    ? ["Generate a new map", "A*", "Dijkstra's", "Deep First Search"]
    : [];

  return (
    <div className="navbar">
      <div className="title">
        <h1>
          {location.pathname.includes("/sorting") ? "Sorting" : "Pathfinder"}
        </h1>
      </div>
      <div className="btns">
        <button
          disabled={ButtontDisable}
          style={{
            color: "white",
            opacity: ButtontDisable ? "30%" : "100%",
            cursor: ButtontDisable ? "not-allowed" : "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Home
        </button>
        {ButtonMap.map((button_name, index) => (
          <button
            key={index}
            disabled={ButtontDisable}
            style={{
              backgroundColor:
                activeButton === `Button${button_name}` ? "#FF7043" : "#E64A19",
              color: "white",
              opacity: ButtontDisable ? "30%" : "100%",
              cursor: ButtontDisable ? "not-allowed" : "pointer",
            }}
            onClick={() => handleButtonClick(`${button_name}`)}
          >
            {button_name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
