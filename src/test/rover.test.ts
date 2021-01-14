import { Rover } from "../main/rover";

describe("Mars Rover", () => {
  it("should always start the rover at position 0:0:N", () => {
    const rover = new Rover();

    expect(rover.getPosition()).toBe("0:0:N");
  });

  it("should move the robot when given input 'M'", () => {
    const rover = new Rover();
    rover.execute("M");
    expect(rover.getPosition()).toBe("0:1:N");
  });

  it("should move the robot twice given 'MM'", () => {
    const rover = new Rover();
    rover.execute("MM");
    expect(rover.getPosition()).toBe("0:2:N");
  });

  it("should wrap the robot around the grid when input is 'MMMMMMMMMMM'", () => {
    const rover = new Rover();
    rover.execute("MMMMMMMMMMM");
    expect(rover.getPosition()).toBe("0:0:N");
  });

  it("should wrap the robot around the grid when input is 'MMMMMMMMMMMM'", () => {
    const rover = new Rover();
    rover.execute("MMMMMMMMMMMM");
    expect(rover.getPosition()).toBe("0:2:N");
  });
});
