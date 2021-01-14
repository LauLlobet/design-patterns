export class Rover {
  private positionY = 0;
  private direction = "N";
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
    const newIndex = this.directions.indexOf(this.direction) + 1;
    const finalDirection = newIndex > 3 ? 0 : newIndex;
    this.direction = this.directions[finalDirection];
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
