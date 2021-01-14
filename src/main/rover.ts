export class Rover {
  private positionY = 0;

  getPosition(): string {
    return `0:${this.positionY}:N`;
  }

  execute(input: string) {
    const commands: string[] = input.split("");

    commands.forEach(() => {
      if (this.positionY === 10) {
        this.positionY = 0;
      } else {
        this.positionY++;
      }
    });
  }
}
