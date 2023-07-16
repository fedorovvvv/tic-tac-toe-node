import isInteger from "../utils/isInt.js";
import drawError from "../utils/drawError.js";

export const checkConditions = (row, column) => {
    if (row > 3 || column > 3) {
        const msg = 'Please enter numbers from 1 to 3.';
        drawError(msg);
      return false;
    }
  
    if (row < 0 || column < 0) {
        const msg = 'Please enter a positive number.';
        drawError(msg);
        return false;
    }
  
    if (!isInteger(row) || !isInteger(column)) {
        const msg = 'Please enter an integer.';
        drawError(msg);
        return false;
    }
  
    return true;
};