const middleware = require("./index.js");
const express = require("express");

describe("Middleware", () => {
  it("should not be null", () => {
    expect(middleware).not.toBeNull();
  });

  it("should send timer to Statful", async () => {
    const statful = {
      timer: () => {}
    };
    const req = {
      hostname: "localhost",
      method: "GET"
    };

    const res = {
      statusCode: 200
    };

    spyOn(statful, "timer");
    await middleware(statful)(req, res, () => {});

    expect(statful.timer).toHaveBeenCalledWith(
      "response_time",
      expect.any(Number),
      {
        tags: {
          hostname: "localhost",
          method: "GET",
          statusCode: 200,
          statusCodeCategory: "success"
        }
      }
    );
  });
});
