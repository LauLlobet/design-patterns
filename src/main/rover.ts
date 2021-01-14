type Direction = "N" | "E" | "S" | "W";

enum Command {
  Move = "M",
  TurnLeft = "L",
  TurnRight = "R",
}

export class Rover {
  private positionY = 0;
  private direction: Direction = "N";

  getPosition(): string {
    return `0:${this.positionY}:${this.direction}`;
  }

  private isMoveCommand(command: string): boolean {
    return command === Command.Move;
  }

  private isLeftCommand(command: string): boolean {
    return command === Command.TurnLeft;
  }

  private isRightCommand(command: string): boolean {
    return command === Command.TurnRight;
  }

  private isAtNorthBoundary(): boolean {
    return this.positionY === 9;
  }

  private turnRight() {
    const nextDirection: Record<Direction, Direction> = {
      N: "E",
      E: "S",
      S: "W",
      W: "N",
    };

    this.direction = nextDirection[this.direction];
  }

  private turnLeft() {
    const nextDirection: Record<Direction, Direction> = {
      N: "W",
      W: "S",
      S: "E",
      E: "N",
    };

    this.direction = nextDirection[this.direction];
  }

  execute(input: string) {
    const commands: string[] = input.split("");

    commands.forEach((command) => {
      if (this.isMoveCommand(command)) {
        if (this.direction === "N") {
          this.moveNorth();
        }
        if (this.direction === "S") {
          this.moveSouth();
        }
      }
      if (this.isRightCommand(command)) {
        this.turnRight();
      }
      if (this.isLeftCommand(command)) {
        this.turnLeft();
      }
    });
  }

  private moveNorth() {
    if (this.isAtNorthBoundary()) {
      this.positionY = 0;
    } else {
      this.positionY++;
    }
  }

  private moveSouth() {
    if (this.positionY === 0) {
      this.positionY = 9;
    } else {
      this.positionY--;
    }
  }
}
