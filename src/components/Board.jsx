import React from "react";
import Square from "./Square";

const Board = ({ board, onClick }) => {
  return (
    <div className="grid grid-cols-3 gap-2 mt-5">
      {board.map((value, index) => (
        <Square key={index} value={value} onClick={() => onClick(index)} />
      ))}
    </div>
  );
};

export default Board;
