import React, { createContext, useState } from "react";
// Tạo một Context với giá trị mặc định ban đầu
export const GameContext = createContext({
  board: Array(9).fill(null),
  setBoard: () => {},
  isXNext: true,
  setIsXNext: () => {},
  winner: null,
  setWinner: () => {},
});

// Tạo component GameProvider để bọc toàn bộ app hoặc phần cần dùng context
export const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  return (
    <GameContext.Provider value={{ board, setBoard, isXNext, setIsXNext, winner, setWinner }}>
      {children}
    </GameContext.Provider>
  );
};
