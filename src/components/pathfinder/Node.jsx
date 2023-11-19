const Node = ({ isStart, isEnd, row, col }) => {
  const classes = isStart ? "node-start" : isEnd ? "node-End" : "";
  return <div className={`node ${classes}`} id={`node-${row}-${col}`}></div>;
};

export default Node;
