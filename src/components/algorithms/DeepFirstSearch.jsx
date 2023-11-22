export default function DFS(startNode, endNode) {
  const visitedNodesInOrder = [];
  const found = dfsVisit(startNode, endNode, visitedNodesInOrder, new Set());

  return {
    path: found ? backtracePath(endNode) : [],
    visitedNodes: visitedNodesInOrder,
  };
}

function dfsVisit(node, endNode, visitedNodesInOrder, visitedSet) {
  if (visitedSet.has(node)) {
    return false;
  }

  visitedSet.add(node);
  visitedNodesInOrder.push(node);

  if (node === endNode) {
    return true;
  }

  for (const neighbor of node.neighbours) {
    if (!neighbor.isWall && !visitedSet.has(neighbor)) {
      neighbor.previousNode = node; // Set the previous node
      if (dfsVisit(neighbor, endNode, visitedNodesInOrder, visitedSet)) {
        return true;
      }
    }
  }

  return false;
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
