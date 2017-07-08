const timer = require('./timer');

module.exports = statful => (req, res, next) => {
  const statfulTimer = timer();
  res.on('finish', () =>
    statful.timer('response_time', statfulTimer(), {
      tags: {
        host: req.host,
        method: req.method,
        statusCode: res.statusCode,
        route: req.route ? req.route.path : 'unknown_route',
      },
    })
  );

  return next();
};
