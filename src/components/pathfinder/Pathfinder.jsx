import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import Node from "./Node";
import Astar from "../algorithms/Astar";
import Dijkstra from "../algorithms/Dijkstra";
import DeepFirstSearch from "../algorithms/DeepFirstSearch";
const Pathfinder = forwardRef((prosp, ref) => {
  const col = 30;
  const row = 30;

  const NODE_START_ROW = 0;
  const NODE_START_COL = 0;
  const NODE_END_ROW = row - 1;
  const NODE_END_COL = col - 1;

  const [grid, setGrid] = useState([]);

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    const allNodes = document.querySelectorAll(".node");
    allNodes.forEach((node) => {
      node.classList.remove("node-visited", "node-shortest-path");
    });

    const newGrid = Array.from({ length: row }, (_, rowIndex) =>
      Array.from({ length: col }, (_, colIndex) => {
        const isStart =
          rowIndex === NODE_START_ROW && colIndex === NODE_START_COL;

        const isEnd = rowIndex === NODE_END_ROW && colIndex === NODE_END_COL;
        const isWall = Math.random() < 0.2;
        return new Spot(rowIndex, colIndex, isStart, isEnd, isWall);
      })
    );
    setGrid(newGrid);
    addNeighbours(newGrid);
  };

  const addNeighbours = (grid) => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        grid[i][j].addNeighbours(grid);
      }
    }
  };

  function Spot(x, y, isStart, isEnd, isWall) {
    this.x = x;
    this.y = y;
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.isWall = isWall;
    this.previousNode = null;
    this.distance = Infinity;
    this.neighbours = [];
    this.addNeighbours = function (grid) {
      if (x > 0) this.neighbours.push(grid[x - 1][y]);
      if (x < row - 1) this.neighbours.push(grid[x + 1][y]);
      if (y > 0) this.neighbours.push(grid[x][y - 1]);
      if (y < col - 1) this.neighbours.push(grid[x][y + 1]);
    };
  }

  const handleNodeClick = (rowIndex, colIndex) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => row.slice());
      newGrid[rowIndex][colIndex].isWall = !newGrid[rowIndex][colIndex].isWall;
      return newGrid;
    });
  };
  const visualizePath = (algorithm) => {
    const startNode = grid[NODE_START_ROW][NODE_START_COL];
    const endNode = grid[NODE_END_ROW][NODE_END_COL];
    let pathResult;

    if (algorithm === "Astar") {
      pathResult = Astar(startNode, endNode);
    } else if (algorithm === "Dijkstra") {
      pathResult = Dijkstra(startNode, endNode, grid);
    } else if (algorithm === "DFS") {
      pathResult = DeepFirstSearch(startNode, endNode, grid);
    }
    console.log(pathResult.path, "   ", pathResult.visitedNodes);
    calculatePath(pathResult.path, pathResult.visitedNodes);
  };

  const calculatePath = (path, visitedNodes) => {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(path);
        }, 15 * i);
      } else {
        setTimeout(() => {
          const node = visitedNodes[i];
          const nodeElement = document.getElementById(
            `node-${node.x}-${node.y}`
          );
          if (!node.isStart && !node.isEnd) {
            nodeElement.className = "node node-visited";
          }
        }, 15 * i);
      }
    }
  };

  const visualizeShortestPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        const nodeElement = document.getElementById(`node-${node.x}-${node.y}`);
        if (!node.isStart && !node.isEnd) {
          nodeElement.className = "node node-shortest-path";
        }
      }, 30 * i);
    }
  };

  useImperativeHandle(ref, () => ({
    initializeGrid,
    visualizePath,
  }));
  return (
    <>
      <div className="pathfinder-visualizer">
        <div className="grid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="rowWrapper">
              {row.map((node, colIndex) => (
                <Node
                  key={`${rowIndex}-${colIndex}`}
                  row={rowIndex}
                  col={colIndex}
                  isStart={node.isStart}
                  isEnd={node.isEnd}
                  isWall={node.isWall}
                  onNodeClick={() => handleNodeClick(rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

export default Pathfinder;
