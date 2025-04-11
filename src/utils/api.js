
// import axios from 'axios';

// const API_KEY = 'f6559758acmsh97bfbe2c92410e0p113c3bjsn038c088d9387'; // Khóa truy cập RapidAPI
// const API_HOST = 'tic-tac-toe-ai.p.rapidapi.com'; // Tên host API

// export const fetchAIMove = async (board, player) => {
//   // Chuyển mảng board thành chuỗi 9 ký tự, dùng '-' thay cho null
//   const state = board.map(cell => (cell === null ? '-' : cell)).join('');

//   const options = {
//     method: 'GET',
//     url: `https://${API_HOST}/${state}/${player}`, // Gửi yêu cầu đến API
//     headers: {
//       'x-rapidapi-key': API_KEY,
//       'x-rapidapi-host': API_HOST
//     }
//   };

//   try {
//     const response = await axios.request(options);
//     const { position } = response.data; // Lấy vị trí được AI đề xuất
//     return position;
//   } catch (error) {
//     console.error('Lỗi khi gọi API:', error); // Bắt lỗi nếu gọi thất bại
//     return null;
//   }
// };


import { checkWinner } from "./gameLogic";

// AI DỄ: Chọn ô trống bất kỳ (ngẫu nhiên)
export const easyAI = (board) => {
  let availableMoves = board.map((val, index) => (val === null ? index : null)).filter((val) => val !== null);
  return availableMoves.length > 0 ? availableMoves[Math.floor(Math.random() * availableMoves.length)] : null;
};

//AI TRUNG BÌNH: Kiểm tra thắng trước, nếu không thì chặn đối thủ, nếu không thì chọn ngẫu nhiên
export const mediumAI = (board) => {
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      let tempBoard = [...board];
      tempBoard[i] = "O"; // Giả sử AI đánh vào đây
      if (checkWinner(tempBoard) === "O") return i; // Nếu thắng → đánh luôn

      tempBoard[i] = "X"; // Giả sử người chơi đánh vào đây
      if (checkWinner(tempBoard) === "X") return i; // Nếu người chơi sắp thắng → chặn lại
    }
  }
  return easyAI(board); // Nếu không có gì đặc biệt → chọn ô ngẫu nhiên
};

//  AI KHÓ: Dùng thuật toán minimax để chọn nước đi tối ưu nhất
export const hardAI = (board) => {
  let bestScore = -Infinity;
  let move = null;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = "O"; // AI đánh thử
      let score = minimax(board, 0, false); // Tính điểm của nước đi đó
      board[i] = null; // Trả lại trạng thái ban đầu

      if (score > bestScore) {
        bestScore = score;
        move = i; // Lưu vị trí có điểm cao nhất
      }
    }
  }
  return move;
};

// Thuật toán Minimax: đánh giá các nước đi có thể xảy ra
const minimax = (board, depth, isMaximizing) => {
  let result = checkWinner(board);
  if (result === "X") return -10 + depth; // Nếu người chơi thắng → điểm thấp
  if (result === "O") return 10 - depth;  // Nếu AI thắng → điểm cao
  if (!board.includes(null)) return 0;    // Nếu hết ô → hòa

  if (isMaximizing) {
    // Lượt của AI
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore); // Tìm điểm cao nhất
      }
    }
    return bestScore;
  } else {
    // Lượt của người chơi
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "X";
        let score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore); // Tìm điểm thấp nhất
      }
    }
    return bestScore;
  }
};
