# statful-middleware-express

A common pattern in expressjs/restify applications it to gather response times from all received requests, this middleware takes care of collecting common useful metrics automatically.

[![npm version](https://badge.fury.io/js/statful-middleware-express.svg)](https://badge.fury.io/js/statful-middleware-express) [![Build Status](https://travis-ci.org/statful/statful-middleware-express.svg?branch=master)](https://travis-ci.org/statful/statful-middleware-express)

## Installing

```shell
npm install --save statful-middleware-express statful-client
```

```shell
yarn add statful-middleware-express statful-client
```

## Getting started

```js
const express = require("express");
const Statful = require("statful-client");
const statfulMiddleware = require("statful-middleware-express");

const app = express();
const statful = new Statful({
  /* statful configuration */
});

app.use(statfulMiddleware(statful));
app.listen(3000);
```

## Configuration

Most of the configuration is done directly in the statful instance. You can read more about the available options directly from the [Statful repository](https://github.com/statful/statful-client-nodejs#global-configuration).

## Default Metrics

By default, the follow metrics are collected, with the corresponding tags:

- `response_time`
  - `hostname`
  - `method`: GET, POST, PUT ...
  - `statusCode`: 200, 400, 404 ...
  - `statusCodeCategory`
    - informational
    - success
    - redirection
    - client_error
    - server_error
  - `route`: Either the route handler's name, the route path or `unknown_route`. e.g.: `/users/:id?`

## Authors

[Mindera - Software Craft](https://github.com/Mindera)

## License

statful-middleware-express is available under the MIT license. See the [LICENSE](https://raw.githubusercontent.com/statful/statful-middleware-express/master/LICENSE.md) file for more information.
