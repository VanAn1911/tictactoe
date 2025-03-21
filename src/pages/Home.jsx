import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleStartGame = (mode) => {
    navigate(`/game?mode=${mode}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-blue-500">
      {/* Tiêu đề */}
      <h1 className="text-5xl font-extrabold text-white mb-12 drop-shadow-lg animate-bounce">
        🎮 Tic-Tac-Toe
      </h1>

      {/* Chọn chế độ */}
      <div className="space-y-8">
        <button
          onClick={() => handleStartGame("ai")}
          className="bg-yellow-400 text-black font-semibold text-xl px-8 py-4 rounded-2xl shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-110"
        >
          🤖 Chơi với Máy
        </button>

        <button
          onClick={() => handleStartGame("player")}
          className="bg-green-400 text-black font-semibold text-xl px-8 py-4 rounded-2xl shadow-lg hover:bg-green-500 transition-transform transform hover:scale-110"
        >
          👥 Chơi với Bạn
        </button>
      </div>

      
    </div>
  );
};

export default Home;
