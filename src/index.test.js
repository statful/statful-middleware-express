const test = require('ava');
const middleware = require('./');
const request = require('supertest');
const express = require('express');

const createApp = instance => {
  const app = express();
  app.use(middleware(instance));
  return app;
};

test('trigger the timer method when it receives a request', async t => {
  const statful = {
    called: false,
    timer() {
      this.called = true;
    },
  };
  const app = createApp(statful);
  const res = await request(app).get('/').send();

  t.true(statful.called);
});

test('trigger the timer method with `response_time` event', async t => {
  const statful = {
    event: '',
    timer(event) {
      this.event = event;
    },
  };
  const app = createApp(statful);
  const res = await request(app).get('/').send();

  t.is(statful.event, 'response_time');
});

test('trigger the timer method with request duration event', async t => {
  const statful = {
    interval: '',
    timer(event, interval) {
      this.interval = interval;
    },
  };
  const app = createApp(statful);
  // Delay the response by at least 200ms
  app.get('/', (req, res) => setTimeout(() => res.send('OK'), 200));

  const res = await request(app).get('/').send();

  // We can never be sure about the exact delay,
  // but we know for sure that it's bigger than 200ms
  t.true(statful.interval >= 200);
});

test('trigger the timer method with useful set of tags', async t => {
  const statful = {
    tags: [],
    timer(event, interval, options) {
      this.tags.push(options.tags);
    },
  };
  const app = createApp(statful);
  app.get('/user/:id', (req, res, next) => res.status(204).send());

  const res = await request(app).get('/user/56').send();
  const res2 = await request(app).get('/').send();

  // Catch-all Route
  app.get('*', (req, res, next) => res.status(204).send());
  const res3 = await request(app).get('/').send();

  t.deepEqual(statful.tags[0], {
    hostname: '127.0.0.1',
    method: 'GET',
    statusCode: 204,
    statusCodeCategory: 'success'
  });

  t.deepEqual(statful.tags[1], {
    hostname: '127.0.0.1',
    method: 'GET',
    statusCode: 404,
    statusCodeCategory: 'client_error'
  });

  t.deepEqual(statful.tags[2], {
    hostname: '127.0.0.1',
    method: 'GET',
    statusCode: 204,
    statusCodeCategory: 'success'
  });
});

test('Ensure that it works correctly with static resources', async t => {
  const statful = {
    tags: [],
    timer(event, interval, options) {
      this.tags.push(options.tags);
    },
  };
  const app = createApp(statful);
  app.use(express.static('public')) 

  await request(app).get('/foo.js').send();

  t.deepEqual(statful.tags[0], {
    hostname: '127.0.0.1',
    method: 'GET',
    statusCode: 404,
    statusCodeCategory: 'client_error'
  })
})
