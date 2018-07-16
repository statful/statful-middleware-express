const timer = require("./timer");
const getStatusCategory = require("./statusCodes").getCategory;

module.exports = statful => async (req, res, next) => {
  const statfulTimer = timer();

  await next();

  statful.timer("response_time", statfulTimer(), {
    tags: {
      hostname: req.hostname,
      method: req.method,
      statusCode: res.statusCode,
      statusCodeCategory: getStatusCategory(res.statusCode),
      route: req.route.path
    }
  });
};
