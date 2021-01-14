import { Rover } from "../main/rover";

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
    const rover = new Rover();
    rover.execute(input);
    expect(rover.getPosition()).toBe(output);
  });
});
