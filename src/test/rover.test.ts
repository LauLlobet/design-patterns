import { Rover } from "../main/rover";

describe("Mars Rover", () => {
  it("should get the robot's position", () => {
    const rover = new Rover(0, 0);

    expect(rover.getPosition()).toBe("0,0");
  });

  it("should get position when instantiated with x = 5, y = 6", () => {
    const rover = new Rover(5, 6);

    expect(rover.getPosition()).toBe("5,6");
  });
});
