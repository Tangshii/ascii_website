function AsciiGrid(rowAmount: number, colAmount: number) {
  let asciChar = " ";
  let string = "";
  let bordersCount = 0;

  createBlankGrid();
  createBorders();

  function createBlankGrid() {
    for (let i = 0; i < colAmount; i++) {
      string += asciChar.repeat(rowAmount) + "\n";
    }
  }

  function createBorders() {
    for (let i = 1; i < colAmount; i++) {
      // for (let i = 2; i < colAmount - 1; i++) {
      replaceCharAt2d("|", 0, i);
      replaceCharAt2d("|", rowAmount - 1, i);
      bordersCount += 2;
    }

    for (let i = 0; i < rowAmount - 1; i++) {
      replaceCharAt2d("_", i, 0);
      replaceCharAt2d("‾", i, colAmount);
      bordersCount += 2;
    }
    replaceCharAt2d(" ", 0, 0);
    replaceCharAt2d(" ", 0, colAmount);
    bordersCount -= 2;
  }

  function checkIfBordersEmpty() {
    for (let i = 1; i < colAmount; i++) {
      if (getCharAt2d(0, i) == "|") {
        return false;
      }
      if (getCharAt2d(rowAmount - 1, i) == "|") {
        return false;
      }
    }
    for (let i = 0; i < rowAmount - 1; i++) {
      if (getCharAt2d(i, 0) == "_") {
        return false;
      }
      if (getCharAt2d(i, colAmount) == "‾") {
        return false;
      }
    }
    return true;
  }

  function replaceCharAt(char: string, index: number) {
    if (index < 0 || index > string.length) {
      return "Index out of bounds";
    }
    let replacedChar = string.charAt(index);
    string = string.slice(0, index) + char + string.slice(index + 1);
    return replacedChar;
  }

  function replaceCharAt2d(char: string, x: number, y: number) {
    let index = x + y * (rowAmount + 1);
    return replaceCharAt(char, index);
  }

  function replaceStringAt2d(string: string, x: number, y: number) {
    for (let i = 0; i < string.length; i++) {
      let char = string.charAt(i);
      let index = x + y * (rowAmount + 1) + i;
      replaceCharAt(char, index);
    }
  }

  function getCharAt2d(x: number, y: number) {
    let index = x + y * (rowAmount + 1);
    return string.charAt(index);
  }

  interface AsciiPart {
    x: number;
    y: number;
    char: string;
  }

  function replacePartAt2d(asciiPart: AsciiPart) {
    let index = asciiPart.x + asciiPart.y * (rowAmount + 1);
    return replaceCharAt(asciiPart.char, index);
  }

  function getString() {
    return string;
  }

  return {
    replaceCharAt,
    replaceCharAt2d,
    getString,
    createBorders,
    replacePartAt2d,
    checkIfBordersEmpty,
    bordersCount,
    replaceStringAt2d,
  };
}

export default AsciiGrid;
