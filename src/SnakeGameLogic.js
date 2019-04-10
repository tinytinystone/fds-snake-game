import { ROWS, COLS } from "./config";

// NOTE: ROWS, COLS에는 행의 개수, 열의 개수가 저장되어 있습니다.
// 이 변수를 활용해서 코드를 작성하세요!

// - 설정 파일(config.js)를 편집해 게임 난이도를 바꾸어보세요.

class SnakeGameLogic {
  constructor() {
    this.joints = [{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }];
    this.direction = "right";
    this.fruit = this.nextFruit();
  }
  up() {
    this.direction = "up";
  }
  down() {
    this.direction = "down";
  }
  left() {
    this.direction = "left";
  }
  right() {
    this.direction = "right";
  }
  nextState() {
    let newHead;
    let newFruit = {};

    if (this.direction === "up") {
      newHead = {
        x: this.joints[0].x,
        y: this.joints[0].y - 1
      };
    } else if (this.direction === "down") {
      newHead = {
        x: this.joints[0].x,
        y: this.joints[0].y + 1
      };
    } else if (this.direction === "right") {
      newHead = {
        x: this.joints[0].x + 1,
        y: this.joints[0].y
      };
    } else if (this.direction === "left") {
      newHead = {
        x: this.joints[0].x - 1,
        y: this.joints[0].y
      };
    }

    if (
      newHead.y >= ROWS ||
      newHead.y < 0 ||
      newHead.x >= COLS ||
      newHead.x < 0 ||
      this.joints.some(joint => joint.x === newHead.x && joint.y === newHead.y)
    ) {
      return false;
    }

    if (newHead.x === this.fruit.x && newHead.y === this.fruit.y) {
      do {
        this.fruit = this.nextFruit();
      } while (
        (this.fruit.x === newHead.x && this.fruit.y === newHead.y) ||
        this.joints.some(
          joint => joint.x === this.fruit.x && joint.y === this.fruit.y
        )
      );
    } else {
      this.joints.pop();
    }

    this.joints.unshift(newHead);
    return true;
  }
  nextFruit() {
    return {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS)
    };
  }
}

export default SnakeGameLogic;
