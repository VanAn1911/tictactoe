export const checkWinner = (board) => {
  const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Hàng ngang
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cột dọc
    [0, 4, 8], [2, 4, 6], // Đường chéo
  ];

  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: pattern };
    }
  }

  return null;
};
