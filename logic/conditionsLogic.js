import isInteger from "../utils/isInt.js";
import drawError from "../utils/drawError.js";

export const checkConditions = (row, column, board) => {
    if ( board[+row - 1][+column - 1] !== ' ' ) {
        const msg = 'This cell is filled';
        drawError(msg);
        return {
            status: false,
            msg
        };
    };

    if (row > 3 || column > 3) {
        const msg = 'Please enter numbers from 1 to 3.';
        drawError(msg);
        return {
            status: false,
            msg
        };
    }
  
    if (row < 0 || column < 0) {
        const msg = 'Please enter a positive number.';
        drawError(msg);
        return {
            status: false,
            msg
        };
    }
  
    if (!isInteger(row) || !isInteger(column)) {
        const msg = 'Please enter an integer.';
        drawError(msg);
        return {
            status: false,
            msg
        };
    }
  
    return {
        status: true,
    };
};