const timer = require('./timer');
const getStatusCategory = require('./statusCodes').getCategory;

module.exports = statful => (req, res, next) => {
  const statfulTimer = timer();
  res.on('finish', () => (
    statful.timer('response_time', statfulTimer(), {
      tags: {
        hostname: req.hostname,
        method: req.method,
        statusCode: res.statusCode,
        statusCodeCategory: getStatusCategory(res.statusCode),
      },
    })
  ));

  return next();
};
