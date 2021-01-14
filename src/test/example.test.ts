import { Example } from "../main/example";

describe("Mars Rover", () => {
  it("should get the robot's position", () => {
    const rover = new Rover();

    expect(rover.getPosition()).toBe("0,0");
  });
});
