import isInteger from "../utils/isInt.js";

export const checkConditions = (row, column) => {
    if (row > 3 || column > 3) {
      console.log('Please enter numbers from 1 to 3');
      return false;
    }
  
    if (row < 0 || column < 0) {
      console.log('Please enter a positive number');
      return false;
    }
  
    if (!isInteger(row) || !isInteger(column)) {
      console.log('Please enter an integer');
      return false;
    }
  
    return true;
};  