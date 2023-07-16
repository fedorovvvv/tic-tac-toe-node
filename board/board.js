export const initBoard = () => {
    const boardRows = new Array(3).fill([]);
    const board = boardRows.map(() => new Array(3).fill(' '));
    return board;
}

export const drawBoard = (board) => { 
    console.clear();
    board.map((row) => {
        console.log(row.join(' | '));
        console.log('---------')
    })
}