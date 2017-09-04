const timer = require('./timer');

module.exports = statful => (req, res, next) => {
  const statfulTimer = timer();
  res.on('finish', () =>
    statful.timer('response_time', statfulTimer(), {
      tags: {
        hostname: req.hostname,
        method: req.method,
        statusCode: res.statusCode,
      },
    })
  );

  return next();
};
