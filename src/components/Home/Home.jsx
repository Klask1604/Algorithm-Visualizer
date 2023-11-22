import { useNavigate, useLocation } from "react-router-dom";
import sorting from "./sorting.jpg";
import pathfind from "./pathfinder.png";
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isBarsRoute = location.pathname != "/";

  return (
    <>
      {!isBarsRoute && (
        <div className="main-container">
          <div className="title">
            <h1>ALGORITHM VISUALIZER</h1>
          </div>
          <div className="chooseAlgorithm">
            <div className="algorithm" onClick={() => navigate("/sorting")}>
              <div className="image">
                <img src={sorting}></img>
              </div>
              <div className="description">
                <h1>Sorting</h1>
                <p>BubbleSort SelectionSort InsertionSort RadixSort</p>
              </div>
            </div>
            <div className="algorithm" onClick={() => navigate("/pathfinder")}>
              <div className="image">
                <img src={pathfind}></img>
              </div>
              <div className="description">
                <h1>Pathfind</h1>
                <p>A* Dijkstra DeepFirstSearch</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
