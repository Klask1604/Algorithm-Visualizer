const Node = ({ row, col, isStart, isEnd, isWall, onNodeClick }) => {
  const extraClassName = isStart
    ? "node-start"
    : isEnd
    ? "node-end"
    : isWall
    ? "node-wall"
    : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onClick={() => onNodeClick(row, col)}
    />
  );
};

export default Node;
