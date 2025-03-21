import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import Board from "./Board";
import { easyAI, mediumAI, hardAI } from "../utils/api";
import { checkWinner } from "../utils/gameLogic";

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Khai báo hook điều hướng

  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode") || "player";

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [difficulty, setDifficulty] = useState("Medium");

  useEffect(() => {
    const gameWinner = checkWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);
      alert(`🎉 Chúc mừng! ${gameWinner} chiến thắng!`);
    } else if (!board.includes(null)) {
      setIsDraw(true);
      alert("🤝 Trận đấu hòa!");
    }
  }, [board]);

  useEffect(() => {
    if (mode === "ai" && !isXNext && !winner && !isDraw) {
      setTimeout(aiMove, 500);
    }
  }, [board, isXNext]);

  const aiMove = () => {
    let move;
    if (difficulty === "Easy") {
      move = easyAI(board);
    } else if (difficulty === "Medium") {
      move = mediumAI(board);
    } else {
      move = hardAI(board);
    }
    if (move !== null) handleClick(move);
  };

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  // Xử lý quay lại trang chủ
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 ">
      <h1 className="text-4xl font-bold mb-6">Tic-Tac-Toe</h1>
      <h2 className="text-lg mb-4">{mode === "ai" ? "Chế độ: Chơi với máy" : "Chế độ: Chơi với bạn"}</h2>

      {mode === "ai" && (
        <div className="mb-4">
          <label className="mr-2">Chọn độ khó:</label>
          <select
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
            className="border-2 border-gray-600 p-2 rounded"
          >
            <option value="Easy">Dễ</option>
            <option value="Medium">Trung bình</option>
            <option value="Hard">Khó</option>
          </select>
        </div>
      )}

      <Board board={board} onClick={handleClick} />

      <h2 className="mt-4 text-2xl">
        {winner
          ? `🎉 Winner: ${winner}`
          : isDraw
          ? "🤝 Game Draw!"
          : `Next player: ${isXNext ? "X" : "O"}`}
      </h2>

      {/* Nút Restart */}
      <button
        onClick={handleReset}
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Restart
      </button>

      {/* Nút Quay lại Home */}
      <button
        onClick={handleGoHome}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
      >
        Quay lại Trang chủ
      </button>
    </div>
  );
};

export default Game;
