import { useEffect, useState } from "react";
import Node from "./Node";
import Astar from "../algorithms/Astar";
const Pathfinder = () => {
  const col = 20;
  const row = 10;

  const NODE_START_ROW = Math.floor(Math.random() * (row / 2));
  const NODE_START_COL = Math.floor(Math.random() * (col / 2));
  const NODE_END_ROW = Math.floor(Math.random() * (row - row / 2) + row / 2);
  const NODE_END_COL = Math.floor(Math.random() * (col - col / 2) + col / 2);

  // const NODE_START_ROW = 0;
  // const NODE_START_COL = 0;
  // const NODE_END_ROW = row - 1;
  // const NODE_END_COL = col - 1;

  const [Grid, setGrid] = useState([]);
  const [Path, setPath] = useState([]);
  const [VisitedNodes, setVisitedNodes] = useState([]);
  useEffect(() => {
    initGrid();
  }, []);

  const initGrid = () => {
    const grid = new Array(row);
    for (let i = 0; i < row; i++) {
      grid[i] = new Array(col);
    }

    createSpot(grid);
    setGrid(grid);
    addNeighbours(grid);

    const startNode = grid[NODE_START_ROW][NODE_START_COL];
    const endNode = grid[NODE_END_ROW][NODE_END_COL];
    let path = Astar(startNode, endNode);
    startNode.isWall = false;
    endNode.isWall = false;
    setPath(path.path);
    setVisitedNodes(path.visitedNodes);
  };

  const createSpot = (grid) => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
  };

  const addNeighbours = (grid) => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        grid[i][j].addneighbours(grid);
      }
    }
  };
  function Spot(i, j) {
    this.x = i;
    this.y = j;
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.isWall = false;
    if (Math.random(1) < 0.2) {
      this.isWall = true;
    }
    this.neighbours = [];
    this.previous = undefined;
    this.addneighbours = function (grid) {
      let i = this.x;
      let j = this.y;
      if (i > 0) this.neighbours.push(grid[i - 1][j]);
      if (i < row - 1) this.neighbours.push(grid[i + 1][j]);
      if (j > 0) this.neighbours.push(grid[i][j - 1]);
      if (j < col - 1) this.neighbours.push(grid[i][j + 1]);
    };
  }
  const visualizeShortestPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-shortest-path";
      }, 10 * i);
    }
  };
  const visualizePath = () => {
    for (let i = 0; i <= VisitedNodes.length; i++) {
      if (i === VisitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(Path);
        }, 20 * i);
      } else {
        setTimeout(() => {
          const node = VisitedNodes[i];
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-visited";
        }, i * 20);
      }
    }
  };
  const GridWithNodes = () => {
    return (
      <div
        style={{
          height: "auto",
        }}
      >
        <button
          style={{
            height: "auto",
          }}
          onClick={visualizePath}
        >
          play
        </button>
        {Grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="rowWrapper">
              {row.map((col, colIndex) => {
                const { isStart, isEnd, isWall } = col;
                return (
                  <Node
                    key={colIndex}
                    isStart={isStart}
                    isEnd={isEnd}
                    row={rowIndex}
                    col={colIndex}
                    isWall={isWall}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="pathfinder-visualizer">
        <div className="grid">{GridWithNodes()}</div>
      </div>
    </>
  );
};
export default Pathfinder;
