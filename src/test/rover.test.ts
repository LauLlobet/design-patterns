import { timeStamp } from "console";

describe("Mars Rover", () => {
  it("should always start the rover at position 0:0:N", () => {
    const rover = new Rover();

    expect(rover.getPosition()).toBe("0:0:N");
  });

  it.each([
    ["M", "0:1:N"],
    ["MM", "0:2:N"],
    ["MMMMMMMMMM", "0:0:N"],
    ["MMMMMMMMMMM", "0:1:N"],
    ["R", "0:0:E"],
    ["RR", "0:0:S"],
    ["RRR", "0:0:W"],
    ["RRRR", "0:0:N"],
    ["L", "0:0:W"],
    ["LL", "0:0:S"],
    ["LLL", "0:0:E"],
    ["LLLL", "0:0:N"],
    ["RRM", "0:9:S"],
  ])("when given %s it should return %s", (input, output) => {
    const rovercli = new RoverCLI();
    rovercli.execute(input);
    expect(rovercli.getPosition()).toBe(output);
  });


  it.each([
    ["MU", "0:0:N"],
    ["MMU", "0:1:N"],
    ["MMMU", "0:2:N"],
    ["MMMUU", "0:1:N"],
  ])("when given %s it should return %s after undoing", (input, output) => {
    const rovercli = new RoverCLI();
    rovercli.execute(input);
    expect(rovercli.getPosition()).toBe(output);
  });
});


//-------------------- IMPLEMENTATION

type Direction = "N" | "E" | "S" | "W";

enum Command {
  Move = "M",
  TurnLeft = "L",
  TurnRight = "R",
  UndoMoveCommand = "U"
}

class MoveCommand {
  public execute(context: Rover) {
    if (context.direction === "N") {
      context.moveNorth();
    }
    if (context.direction === "S") {
      context.moveSouth();
    }
  }
}
class UndoMoveCommand {
  public execute(context: Rover) {
    context.turnLeft()
    context.turnLeft()
    let command = CommandFactory.commandFor('M');
    command.execute(context); 
    context.turnLeft()
    context.turnLeft()
  }
}
class TurnLeftCommand {
  public execute(context: Rover) {
    context.turnLeft()
  }
}
class TurnRightCommand {
  public execute(context: Rover) {
    context.turnRight()
  }
}

class CommandFactory {
  public static commandFor(command: string) {
    if (this.isMoveCommand(command)) {
      return new MoveCommand();
    }
    if (!this.isRightCommand(command)) { } else {
      return new TurnRightCommand();
    }
    if(this.isUndoMoveCommand(command)){
      return new UndoMoveCommand();

    }
    return new TurnLeftCommand();
  }

  private static isMoveCommand(command: string): boolean {
    return command === Command.Move;
  }

  private static isRightCommand(command: string): boolean {
    return command === Command.TurnRight;
  }

  private static isUndoMoveCommand(command: string): boolean {
    return command == Command.UndoMoveCommand;
  }
}
class Rover {
  private positionY = 0;
  public direction: Direction = "N"; // WHY: no module level encapsulation... https://github.com/microsoft/TypeScript/issues/321

  getPosition(): string {
    return `0:${this.positionY}:${this.direction}`;
  }

  private isAtNorthBoundary(): boolean {
    return this.positionY === 9;
  }

  public turnRight() {
    const nextDirection: Record<Direction, Direction> = {
      N: "E",
      E: "S",
      S: "W",
      W: "N",
    };

    this.direction = nextDirection[this.direction];
  }

  public turnLeft() {
    const nextDirection: Record<Direction, Direction> = {
      N: "W",
      W: "S",
      S: "E",
      E: "N",
    };

    this.direction = nextDirection[this.direction];
  }


  public moveNorth() {
    if (this.isAtNorthBoundary()) {
      this.positionY = 0;
    } else {
      this.positionY++;
    }
  }

  public moveSouth() {
    if (this.positionY === 0) {
      this.positionY = 9;
    } else {
      this.positionY--;
    }
  }
}

export class RoverCLI {
  private rover: Rover = new Rover();

  public getPosition(){
    return this.rover.getPosition();
  }
  execute(input: string) {
    const commands: string[] = input.split("");
    commands.forEach((commandChar) => {
      let command = CommandFactory.commandFor(commandChar);
      command.execute(this.rover);
    });
  }
}
