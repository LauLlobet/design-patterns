export class Rover {
  private positionY = 0;

  getPosition(): string {
    return `0:${this.positionY}:N`;
  }

  execute(input: string) {
    this.positionY++;
  }
}
