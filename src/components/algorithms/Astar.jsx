function Astar(startNode, endNode) {
  let openSet = [];
  let closedSet = [];
  let path = [];
  let visitedNodes = [];

  openSet.push(startNode);

  while (openSet.length > 0) {
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }

    let currentNode = openSet[lowestIndex];
    visitedNodes.push(currentNode);

    if (currentNode === endNode) {
      let temp = currentNode;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }

      return { path, visitedNodes };
    }

    openSet = openSet.filter((node) => node !== currentNode);
    closedSet.push(currentNode);

    let neighbours = currentNode.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];

      if (!closedSet.includes(neighbour) && !neighbour.isWall) {
        let tempG = currentNode.g + 1;

        let newPath = false;
        if (openSet.includes(neighbour)) {
          if (tempG < neighbour.g) {
            neighbour.g = tempG;
            newPath = true;
          }
        } else {
          neighbour.g = tempG;
          newPath = true;
          openSet.push(neighbour);
        }

        if (newPath) {
          neighbour.h = heuristic(neighbour, endNode);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = currentNode;
        }
      }
    }
  }

  return { path, visitedNodes }; // No path found
}

function heuristic(a, b) {
  let d = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  return d;
}

export default Astar;
