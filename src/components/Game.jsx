import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Board from "./Board";
import { easyAI, mediumAI, hardAI } from "../utils/api";
import { checkWinner } from "../utils/gameLogic";

// Bọc component Game bằng React.memo để tránh render lại không cần thiết
const Game = React.memo(() => {
  const location = useLocation();
  const navigate = useNavigate(); // Dùng để điều hướng

  // Lấy tham số từ query string (ví dụ: ?mode=ai)
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const mode = useMemo(() => queryParams.get("mode") || "player", [queryParams]); // Mặc định là chơi với người

  // Khai báo các state của game
  const [board, setBoard] = useState(Array(9).fill(null)); // Mảng trạng thái bàn cờ
  const [isXNext, setIsXNext] = useState(true);            // Theo dõi lượt chơi
  const [winner, setWinner] = useState(null);              // Người chiến thắng
  const [isDraw, setIsDraw] = useState(false);             // Trạng thái hòa
  const [difficulty, setDifficulty] = useState("Medium");  // Mức độ AI (nếu chơi với máy)

  // Khi bàn cờ thay đổi, kiểm tra xem có ai thắng chưa
  useEffect(() => {
    const gameWinner = checkWinner(board);
    if (gameWinner) {
      setWinner(gameWinner); // chỉ cập nhật winner, không alert ngay
    } else if (!board.includes(null)) {
      setIsDraw(true); // cũng không alert ở đây
    }
  }, [board]);
  
  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        alert(`🎉 Chúc mừng! ${winner} chiến thắng!`);
      }, 100); // delay nhẹ để giao diện kịp render
    } else if (isDraw) {
      setTimeout(() => {
        alert("🤝 Trận đấu hòa!");
      }, 100);
    }
  }, [winner, isDraw]);
  

  // Nếu đang ở chế độ chơi với máy, thì để AI đánh khi đến lượt
  useEffect(() => {
    if (mode === "ai" && !isXNext && !winner && !isDraw) {
      const aiMoveTimeout = setTimeout(aiMove, 300); // Delay
      return () => clearTimeout(aiMoveTimeout); // Clear timeout nếu component unmount
    }
  }, [board, isXNext, mode, winner, isDraw]);

  // Xác định nước đi của AI tùy theo độ khó
  const aiMove = useCallback(() => {
    let move;
    if (difficulty === "Easy") move = easyAI(board);
    else if (difficulty === "Medium") move = mediumAI(board);
    else move = hardAI(board);
    if (move !== null) handleClick(move);
  }, [board, difficulty]);

  // Xử lý khi người chơi click vào ô
  const handleClick = useCallback((index) => {
    if (board[index] || winner || isDraw) return; // Không làm gì nếu ô đã đánh hoặc game kết thúc
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }, [board, winner, isDraw, isXNext]);

  // Xử lý khi người dùng nhấn nút chơi lại
  const handleReset = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
  }, []);

  // Xử lý quay lại trang chủ
  const handleGoHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // Trả về giao diện của component
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

      {/* Hiển thị bàn cờ */}
      <Board board={board} onClick={handleClick} />

      {/* Hiển thị trạng thái */}
      <h2 className="mt-4 text-2xl font-semibold text-gray-700">
        {winner
          ? `🎉 Winner: ${winner}`
          : isDraw
          ? "🤝 Game Draw!"
          : `Next player: ${isXNext ? "X" : "O"}`}
      </h2>

      {/* Nút thao tác */}
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
