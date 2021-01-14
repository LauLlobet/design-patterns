export class Rover {
  private positionY = 0;

  getPosition(): string {
    return `0:${this.positionY}:N`;
  }

  execute(input: string) {
    const commands: string[] = input.split("");

    commands.forEach(() => this.positionY++);
  }
}
