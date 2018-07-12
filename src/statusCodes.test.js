const statusCodes = require("./statusCodes");

describe("Status Codes", () => {
  it("should not be null", () => {
    expect(statusCodes).not.toBeNull();
  });

  it("should return informational category", () => {
    expect(statusCodes.getCategory(100)).toEqual("informational");
  });

  it("should return success category", () => {
    expect(statusCodes.getCategory(200)).toEqual("success");
  });

  it("should return redirection category", () => {
    expect(statusCodes.getCategory(300)).toEqual("redirection");
  });

  it("should return client_error category", () => {
    expect(statusCodes.getCategory(400)).toEqual("client_error");
  });

  it("should return server_error category", () => {
    expect(statusCodes.getCategory(500)).toEqual("server_error");
  });

  it("should return unknown_statusCode category", () => {
    expect(statusCodes.getCategory(600)).toEqual("unknown_statusCode");
  });
});
