import { useEffect, useState } from "react";
import Node from "./Node";

const Pathfinder = () => {
  const col = 40;
  const row = 15;

  const NODE_START_ROW = 0;
  const NODE_START_COL = 0;
  const NODE_END_ROW = row - 1;
  const NODE_END_COL = col - 1;

  const [Grid, setGrid] = useState([]);

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
  };

  const createSpot = (grid) => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
  };

  function Spot(i, j) {
    this.x = i;
    this.y = j;
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.f = 0;
    this.b = 0;
    this.neighbours = [];
    this.previous;
    this.addneighbours = function (grid) {
      if (i > 0) this.neighbours.push(grid[i - 1][j]);
    };
  }

  const GridWithNodes = () => {
    return (
      <div>
        {Grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="rowWrapper">
              {row.map((col, colIndex) => {
                const { isStart, isEnd } = col;
                return (
                  <Node
                    key={colIndex}
                    isStart={isStart}
                    isEnd={isEnd}
                    row={rowIndex}
                    col={colIndex}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };
  console.log(Grid);

  return (
    <>
      <div className="pathfinder-visualizer">
        <div className="grid" onClick={initGrid}>
          {GridWithNodes()}
        </div>
      </div>
    </>
  );
};
export default Pathfinder;
