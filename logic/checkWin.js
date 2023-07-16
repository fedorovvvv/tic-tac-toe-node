const isWin = (board) => {
    // Check rows
    for (let i = 0; i < board.length; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2] &&
        board[i][0] !== ' '
      ) {
        return true;
      }
    }
  
    // Check columns
    for (let i = 0; i < board.length; i++) {
      if (
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i] &&
        board[0][i] !== ' '
      ) {
        return true;
      }
    }
  
    // Check diagonals
    if (
      (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== ' ') ||
      (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== ' ')
    ) {
      return true;
    }
  
    return false;
};
   
export default isWin;