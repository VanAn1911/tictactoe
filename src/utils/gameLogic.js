export const checkWinner = (board) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Hàng ngang
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cột dọc
    [0, 4, 8], [2, 4, 6], // Đường chéo
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Trả về "X" hoặc "O"
    }
  }

  return null; // Không có người thắng
};
