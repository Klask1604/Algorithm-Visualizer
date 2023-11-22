export default function Dijkstra(startNode, endNode, grid) {
  resetGrid(grid);

  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  const visitedNodesInOrder = [];

  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    // Skip walls
    if (closestNode.isWall) continue;

    // If the closest node is unreachable, stop
    if (closestNode.distance === Infinity) break;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    // If the closest node is the end node, backtrace to find the path
    if (closestNode === endNode) {
      return {
        path: backtracePath(endNode),
        visitedNodes: visitedNodesInOrder,
      };
    }

    updateUnvisitedNeighbors(closestNode, grid);
  }

  console.log("End node not reached, returning visited nodes only.");
  return {
    path: [],
    visitedNodes: visitedNodesInOrder,
  };
}

function resetGrid(grid) {
  for (const row of grid) {
    for (const node of row) {
      node.distance = Infinity;
      node.previousNode = null;
      node.isVisited = false;
    }
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  for (const neighbor of node.neighbours) {
    let alt = node.distance + 1;
    if (alt < neighbor.distance) {
      neighbor.distance = alt;
      neighbor.previousNode = node;
    }
  }
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function backtracePath(endNode) {
  const path = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return path;
}
