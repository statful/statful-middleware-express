// @SEE https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
const categories = {
  INFORMATIONAL: "informational",
  SUCCESS: "success",
  REDIRECTION: "redirection",
  CLIENT_ERROR: "client_error",
  SERVER_ERROR: "server_error"
};

const informationalCodes = [100, 101, 102].reduce((acc, code) => {
  acc[code] = categories.INFORMATIONAL;
  return acc;
}, {});

const successCodes = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226].reduce(
  (acc, code) => {
    acc[code] = categories.SUCCESS;
    return acc;
  },
  {}
);

const redirectionCodes = [300, 301, 302, 303, 304, 305, 306, 307, 308].reduce(
  (acc, code) => {
    acc[code] = categories.REDIRECTION;
    return acc;
  },
  {}
);

const clientErrorCodes = [
  400,
  401,
  402,
  403,
  404,
  405,
  406,
  407,
  408,
  409,
  410,
  411,
  412,
  413,
  414,
  415,
  416,
  417,
  418,
  421,
  422,
  423,
  424,
  426,
  428,
  429,
  431,
  451
].reduce((acc, code) => {
  acc[code] = categories.CLIENT_ERROR;
  return acc;
}, {});

const serverErrorCodes = [
  500,
  501,
  502,
  503,
  504,
  505,
  506,
  507,
  508,
  510,
  511
].reduce((acc, code) => {
  acc[code] = categories.SERVER_ERROR;
  return acc;
}, {});

const codes = Object.assign(
  {},
  informationalCodes,
  successCodes,
  redirectionCodes,
  clientErrorCodes,
  serverErrorCodes
);

module.exports = {
  codes,
  informationalCodes,
  successCodes,
  redirectionCodes,
  clientErrorCodes,
  serverErrorCodes,
  getCategory: status => codes[status] || "unknown_statusCode"
};
