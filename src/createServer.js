'use strict';

const { router: usersRouter } = require('./routes/users.route');
const { router: expensesRouter } = require('./routes/expenses.route');

const cors = require('cors');
const express = require('express');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
