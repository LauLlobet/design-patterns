export class Rover {
  private positionY = 0;
  private direction = "N";

  getPosition(): string {
    return `0:${this.positionY}:${this.direction}`;
  }

  private isMoveCommand(command: string): boolean {
    return command === "M";
  }

  private isAtNorthBoundary(): boolean {
    return this.positionY === 10;
  }

  execute(input: string) {
    const commands: string[] = input.split("");

    commands.forEach((command) => {
      if (this.isMoveCommand(command)) {
        this.moveNorth();
      } else if (this.isFacingNorth()) {
        this.direction = "E";
      } else if (this.isFacingEast()) {
        this.direction = "S";
      }
    });
  }

  private isFacingEast() {
    return this.direction === "E";
  }

  private isFacingNorth(): boolean {
    return this.direction === "N";
  }

  private moveNorth() {
    if (this.isAtNorthBoundary()) {
      this.positionY = 0;
    } else {
      this.positionY++;
    }
  }
}
