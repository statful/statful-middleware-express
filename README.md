![statful](https://avatars1.githubusercontent.com/u/20299158?v=3&s=200)
![expressjs](https://camo.githubusercontent.com/b0c9dc0e2f5bcd190403159a24d4a541e496e30a/68747470733a2f2f636f6c69676f2e696f2f696d616765732f657870726573732e737667)
# statful-middleware-express

A common pattern in expressjs/restify applications it to gather response times from all received requests, this  middleware takes care of gathering common useful metrics automatically.

## Installing

```shell
npm install --save statful-middleware-express statful-client
```
```shell
yarn add statful-middleware-express statful-client
```

## Getting started

```js
const express = require('express');
const Statful = require('statful');
const statfulMiddleware = require('statful-middleware-express');

const app = express();
const statful = new Statful({ /* statful configuration */ });

app.use(statfulMiddleware(statful));
app.listen(3000);
```

## Configuration

Most of the configuration is done directly in the statful instance. You can read more about the available options directly from the [Statful repository](https://github.com/statful/statful-client-nodejs#global-configuration).

## Authors

[Mindera - Software Craft](https://github.com/Mindera)

## License

statful-middleware-express is available under the MIT license. See the [LICENSE](https://raw.githubusercontent.com/statful/statful-middleware-express/master/LICENSE) file for more information.
