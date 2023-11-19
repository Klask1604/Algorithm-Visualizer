import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isBarsRoute = location.pathname != "/";

  return (
    <>
      {!isBarsRoute && (
        <div className="main-card">
          <div className="title-card">
            <h1>ALGORITHM VISUALIZER</h1>
          </div>
          <div className="options-card">
            <div className="option">
              <div className="option-card" onClick={() => navigate("/sorting")}>
                <div className="option-img">
                  <img src="src\assets\sorting.jpg"></img>
                </div>
                <div className="option-text">
                  <h1>Sorting Algorithms</h1>
                  <p>Bubble , Selection , Insertion , Radix</p>
                </div>
              </div>
            </div>
            <div className="option">
              <div className="option-card">
                <div
                  className="option-card"
                  onClick={() => navigate("/pathfinder")}
                >
                  <div className="option-img">
                    <img src="src\assets\pathfinder.png"></img>
                  </div>
                  <div className="option-text">
                    <h1>Pathfinder Algorithms</h1>
                    <p>A* , Dijkstra's , Maximum Flow</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
