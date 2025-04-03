import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Board from "./Board";
import { easyAI, mediumAI, hardAI } from "../utils/api";
import { checkWinner } from "../utils/gameLogic";

const Game = React.memo(() => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const mode = useMemo(() => queryParams.get("mode") || "player", [queryParams]);

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [difficulty, setDifficulty] = useState("Medium");

  // Xử lý khi kết thúc game
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

  // Xử lý khi chơi với máy
  useEffect(() => {
    if (mode === "ai" && !isXNext && !winner && !isDraw) {
      const aiMoveTimeout = setTimeout(aiMove, 300);
      return () => clearTimeout(aiMoveTimeout);
    }
  }, [board, isXNext, mode, winner, isDraw]);

  // Di chuyển AI dựa vào độ khó
  const aiMove = useCallback(() => {
    let move;
    if (difficulty === "Easy") move = easyAI(board);
    else if (difficulty === "Medium") move = mediumAI(board);
    else move = hardAI(board);
    if (move !== null) handleClick(move);
  }, [board, difficulty]);

  // Xử lý khi nhấp vào ô cờ
  const handleClick = useCallback((index) => {
    if (board[index] || winner || isDraw) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }, [board, winner, isDraw, isXNext]);

  // Khởi động lại game
  const handleReset = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
  }, []);

  // Quay lại trang chủ
  const handleGoHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Tic-Tac-Toe</h1>
      <h2 className="text-lg mb-4 text-gray-700">
        {mode === "ai" ? "Chế độ: Chơi với máy" : "Chế độ: Chơi với bạn"}
      </h2>

      {mode === "ai" && (
        <div className="mb-4">
          <label className="mr-2 font-semibold text-gray-700">Chọn độ khó:</label>
          <select
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
            className="border-2 border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Easy">Dễ</option>
            <option value="Medium">Trung bình</option>
            <option value="Hard">Khó</option>
          </select>
        </div>
      )}

      <Board board={board} onClick={handleClick} />

      <h2 className="mt-4 text-2xl font-semibold text-gray-700">
        {winner
          ? `🎉 Winner: ${winner}`
          : isDraw
          ? "🤝 Game Draw!"
          : `Next player: ${isXNext ? "X" : "O"}`}
      </h2>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleReset}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Restart
        </button>

        <button
          onClick={handleGoHome}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
        >
          Quay lại Trang chủ
        </button>
      </div>
    </div>
  );
});

export default Game;
