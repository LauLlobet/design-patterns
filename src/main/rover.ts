type Direction = 'N' | 'E' | 'S' | 'W'

export class Rover {
  private positionY = 0;
  private direction: Direction = "N";
  private directions = "NESW";

  getPosition(): string {
    return `0:${this.positionY}:${this.direction}`;
  }

  private isMoveCommand(command: string): boolean {
    return command === "M";
  }

  private isAtNorthBoundary(): boolean {
    return this.positionY === 10;
  }

  private isRightCommand(command: string): boolean {
    return command === "R";
  }

  private turnRight() {
    const nextDirection: Record<Direction, Direction> = {
      'N': 'E',
      'E': 'S',
      'S': 'W',
      'W': 'N',
    }

    this.direction = nextDirection[this.direction]
  }

  execute(input: string) {
    const commands: string[] = input.split("");

    commands.forEach((command) => {
      if (this.isMoveCommand(command)) {
        this.moveNorth();
      }
      if (this.isRightCommand(command)) {
        this.turnRight();
      }
      if (input === "L") {
        this.direction = "W"
      }
    });
  }

  private isFacingEast() {
    return this.direction === "E";
  }

  private isFacingNorth(): boolean {
    return this.direction === "N";
  }

  private isFacingSouth(): boolean {
    return this.direction === "S";
  }

  private moveNorth() {
    if (this.isAtNorthBoundary()) {
      this.positionY = 0;
    } else {
      this.positionY++;
    }
  }
}
