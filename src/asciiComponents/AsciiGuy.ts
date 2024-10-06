function AsciiGuy(startX: number, startY: number) {
  interface Coord {
    x: number;
    y: number;
  }
  interface AsciiPart {
    x: number;
    y: number;
    char: string;
  }
  enum Direction {
    Left,
    Right,
    Up,
    Down,
  }

  let facingDirection = Direction.Right;
  let currentDirection = Direction.Right;
  function getFacingDirection() {
    return facingDirection;
  }
  function getCurrentDirection() {
    return currentDirection;
  }

  const offsets = {
    origin: { x: 0, y: 0 },
    head: { x: 1, y: 0 },
    leftArm: { x: 0, y: 1 },
    body: { x: 1, y: 1 },
    rightUpperArm: { x: 2, y: 0 },
    rightArm: { x: 2, y: 1 },
    leftUpperArm: { x: 0, y: 0 },
    leftLeg: { x: 0, y: 2 },
    middleLeg: { x: 1, y: 2 },
    rightLeg: { x: 2, y: 2 },
  };

  let origin = { x: startX, y: startY };
  let p = {
    //why we need to wrap in object for it update in another class?
    origin,
    head: { char: "○", x: 1, y: 0 },
    leftArm: { char: "/", x: 0, y: 1 },
    body: { char: "|", x: 1, y: 1 },
    rightUpperArm: { char: " ", x: 2, y: 0 },
    rightArm: { char: "\\", x: 2, y: 1 },
    leftUpperArm: { char: " ", x: 0, y: 0 },
    leftLeg: { char: "/", x: 0, y: 2 },
    middleLeg: { char: " ", x: 1, y: 2 },
    rightLeg: { char: "\\", x: 2, y: 2 },
  };

  moveToCoord(origin);

  function moveToCoord(coord: Coord) {
    origin = coord;
    p.head = addPairs(p.head.char, coord, offsets.head);
    p.leftUpperArm = addPairs(p.leftUpperArm.char, coord, offsets.leftUpperArm);
    p.leftArm = addPairs(p.leftArm.char, coord, offsets.leftArm);
    p.body = addPairs(p.body.char, coord, offsets.body);
    p.rightUpperArm = addPairs(
      p.rightUpperArm.char,
      coord,
      offsets.rightUpperArm
    );
    p.rightArm = addPairs(p.rightArm.char, coord, offsets.rightArm);
    p.leftLeg = addPairs(p.leftLeg.char, coord, offsets.leftLeg);
    p.middleLeg = addPairs(p.middleLeg.char, coord, offsets.middleLeg);
    p.rightLeg = addPairs(p.rightLeg.char, coord, offsets.rightLeg);
  }

  function addPairs(char: string, coord1: Coord, coord2: Coord) {
    return { char: char, x: coord1.x + coord2.x, y: coord1.y + coord2.y };
  }

  function setEmpty() {
    p.head.char = " ";
    p.leftArm.char = " ";
    p.body.char = " ";
    p.rightArm.char = " ";
    p.leftLeg.char = " ";
    p.middleLeg.char = " ";
    p.rightLeg.char = " ";
    p.rightUpperArm.char = " ";
    p.leftUpperArm.char = " ";
  }

  function setDeafult() {
    setHeadAndBody();
    setArms();
    p.leftLeg.char = "/";
    p.middleLeg.char = " ";
    p.rightLeg.char = "\\";
  }

  function setLeft() {
    facingDirection = Direction.Left;
    currentDirection = Direction.Left;
    setHeadAndBody();
    setArms();
    p.leftLeg.char = "(";
    p.middleLeg.char = "|";
    p.rightLeg.char = " ";
  }

  function setRight() {
    facingDirection = Direction.Right;
    currentDirection = Direction.Right;
    setHeadAndBody();
    setArms;
    p.leftLeg.char = " ";
    p.middleLeg.char = "|";
    p.rightLeg.char = ")";
  }

  function setDown() {
    currentDirection = Direction.Down;
    setHeadAndBody();
    p.leftArm.char = "/";
    p.rightArm.char = "\\";
    if (facingDirection === Direction.Left) {
      p.leftLeg.char = "<";
      p.middleLeg.char = "|";
      p.rightLeg.char = " ";
    } else {
      p.leftLeg.char = " ";
      p.middleLeg.char = "|";
      p.rightLeg.char = ">";
    }
  }

  function setDownRecovery() {
    currentDirection = Direction.Down;
    setHeadAndBody();
    p.leftArm.char = "/";
    p.rightArm.char = "\\";
    if (facingDirection === Direction.Left) {
      p.leftLeg.char = "/";
      p.middleLeg.char = "<";
      p.rightLeg.char = " ";
    } else {
      p.leftLeg.char = " ";
      p.middleLeg.char = ">";
      p.rightLeg.char = "\\";
    }
  }

  function setUp(isCatched: boolean) {
    currentDirection = Direction.Up;
    setHeadAndBody();
    setArms(isCatched);
    if (facingDirection === Direction.Left) {
      p.leftLeg.char = "<";
      p.middleLeg.char = "<";
      p.rightLeg.char = " ";
    } else {
      p.leftLeg.char = " ";
      p.middleLeg.char = ">";
      p.rightLeg.char = ">";
    }
  }

  function setUpRecovery(isCatched: boolean) {
    currentDirection = Direction.Up;
    setHeadAndBody();
    setArms(isCatched);
    if (facingDirection === Direction.Left) {
      p.leftLeg.char = "/";
      p.middleLeg.char = "|";
      p.rightLeg.char = " ";
    } else {
      p.leftLeg.char = " ";
      p.middleLeg.char = "|";
      p.rightLeg.char = "\\";
    }
  }

  function setArms(isCatched: boolean = false) {
    if (isCatched) {
      p.leftArm.char = " ";
      p.rightArm.char = " ";
      p.leftUpperArm.char = "(";
      p.rightUpperArm.char = ")";
    } else {
      p.leftArm.char = "/";
      p.rightArm.char = "\\";
      p.leftUpperArm.char = " ";
      p.rightUpperArm.char = " ";
    }
  }

  function setHeadAndBody() {
    p.head.char = "○";
    p.body.char = "|";
  }

  return {
    moveToCoord,
    origin,
    p,
    setEmpty,
    setDeafult,
    setLeft,
    setRight,
    setDown,
    setDownRecovery,
    setUp,
    setUpRecovery,
    getFacingDirection,
    getCurrentDirection,
    Direction,
  };
}

export default AsciiGuy;
