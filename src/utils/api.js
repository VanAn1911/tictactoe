// src/utils/api.js
import { checkWinner } from "./gameLogic";

// AI DỄ: Chọn ô trống ngẫu nhiên
export const easyAI = (board) => {
  let availableMoves = board.map((val, index) => (val === null ? index : null)).filter((val) => val !== null);
  return availableMoves.length > 0 ? availableMoves[Math.floor(Math.random() * availableMoves.length)] : null;
};

// AI TRUNG BÌNH: Chặn thắng hoặc tự thắng
export const mediumAI = (board) => {
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      let tempBoard = [...board];
      tempBoard[i] = "O";
      if (checkWinner(tempBoard) === "O") return i;
      tempBoard[i] = "X";
      if (checkWinner(tempBoard) === "X") return i;
    }
  }
  return easyAI(board); // Nếu không có nước đi tốt, chọn ngẫu nhiên
};

// AI KHÓ: Dùng thuật toán Minimax
export const hardAI = (board) => {
  let bestScore = -Infinity;
  let move = null;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = "O";
      let score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
};

// Thuật toán Minimax
const minimax = (board, depth, isMaximizing) => {
  let result = checkWinner(board);
  if (result === "X") return -10 + depth;
  if (result === "O") return 10 - depth;
  if (!board.includes(null)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "X";
        let score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};
