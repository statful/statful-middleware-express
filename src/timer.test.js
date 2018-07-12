const timer = require("./timer");

describe("Timer", () => {
  it("should not be null", () => {
    expect(timer).not.toBeNull();
  });

  it("should return a function to stop timer", () => {
    const start = timer();
    const stop = start();

    expect(typeof start).toEqual("function");
    expect(typeof stop).toEqual("number");
  });

  it("should return interval between end time and start time", () => {
    const start = new Date("2017-07-06T14:43:17.150Z");
    const end = new Date("2017-07-06T14:43:39.670Z");

    const timerStart = timer(start);
    const timerEnd = timerStart(end);

    expect(timerEnd).toEqual(end - start);
  });
});
