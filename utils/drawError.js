import isInteger from "./isInt.js";

const drawError = (msg) => {
    const maxWidth = 54;

    const halfFreeSpace = Math.round((maxWidth - msg.length) / 2);
    const isOdd = isInteger((maxWidth - msg.length) / 2);

    const leftBorder = isOdd ? ' '.repeat(halfFreeSpace) : ' '.repeat(halfFreeSpace - 1);
    const rightBorder = ' '.repeat(halfFreeSpace - 1);

    console.log(
        `
        *******************************************************
        |                                                     |
        |                \x1b[31mError:\x1b[0m: Invalid input.               |
        |                                                     |
        |${leftBorder}${msg}${rightBorder}|
        |                                                     |
        *******************************************************
        `
    );
}

export default drawError;