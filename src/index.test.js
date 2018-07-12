const middleware = require("./index.js");
const express = require("express");
const request = require("supertest");

const createApp = instance => {
  const app = express();
  app.use(middleware(instance));
  return app;
};

describe("Middleware", () => {
  it("should not be null", () => {
    expect(middleware).not.toBeNull();
  });

  it("should send timer to Statful", async () => {
    const statful = {
      timer: () => {}
    };
    spyOn(statful, "timer");
    const app = createApp(statful);
    await request(app)
      .get("/")
      .send();

    expect(statful.timer).toHaveBeenCalledWith(
      "response_time",
      expect.any(Number),
      {
        tags: {
          hostname: "127.0.0.1",
          method: "GET",
          statusCode: 404,
          statusCodeCategory: "client_error"
        }
      }
    );
  });
});
