export const initBoard = () => {
    const boardRows = new Array(3).fill([]);
    const board = boardRows.map(() => new Array(3).fill(' '));
    return board;
}

export const drawBoard = (board) => {
    console.clear();
    console.log();
    board.forEach((row, index) => {
      console.log(' '.repeat(8) + row.join(' | '));
      if (index < board.length - 1) {
        console.log(' '.repeat(8) + '---------');
      }
    });
    console.log();
  };
  