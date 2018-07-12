const timer = require("./timer");
const test = require("ava");

test("return a function to stop timer", t => {
  const start = timer();
  const stop = start();

  t.is(typeof start, "function");
  t.is(typeof stop, "number");
});

test("return interval between end time and start time", t => {
  const start = new Date("2017-07-06T14:43:17.150Z");
  const end = new Date("2017-07-06T14:43:39.670Z");

  const timerStart = timer(start);
  const timerEnd = timerStart(end);

  t.is(timerEnd, end - start);
});
