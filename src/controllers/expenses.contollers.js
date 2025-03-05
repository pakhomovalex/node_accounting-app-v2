const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAllExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;

  let expenses = expensesService.getAllExpenses();

  if (userId) {
    expenses = expenses.filter((e) => e.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter((e) => e.category === categories);
  }

  if (from) {
    expenses = expenses.filter((e) => new Date(e.spentAt) >= new Date(from));
  }

  if (to) {
    expenses = expenses.filter((e) => new Date(e.spentAt) <= new Date(to));
  }

  res.status(200).send(expenses);
};

const getOneExpense = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getOne(+id)) {
    res.sendStatus(404);
    res.send('Not found');
  }

  if (typeof +id !== 'number') {
    res.sendStatus(400);
    res.send('Write a id for expense');

    return;
  }

  const expense = expensesService.getOne(+id);

  if (!expense) {
    res.sendStatus(404);
    res.send('Not found');

    return;
  }

  res.status(200).send(expense);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    typeof +userId !== 'number' ||
    typeof spentAt !== 'string' ||
    typeof title !== 'string' ||
    typeof amount !== 'number' ||
    typeof category !== 'string' ||
    typeof note !== 'string' ||
    !usersService.getOne(+userId)
  ) {
    res.sendStatus(400);
    res.send('Write correct data');

    return;
  }

  const expense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getOne(id)) {
    res.sendStatus(404);
    res.send('Not found');

    return;
  }

  expensesService.deleteExpense(id);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const { id } = req.params;

  if (!expensesService.getOne(+id)) {
    res.sendStatus(404);
    res.send('Not found');

    return;
  }

  if (
    typeof +userId !== 'number' ||
    typeof spentAt !== 'string' ||
    typeof title !== 'string' ||
    typeof amount !== 'number' ||
    typeof category !== 'string' ||
    typeof note !== 'string'
  ) {
    res.sendStatus(400);
    res.send('Write correct data');

    return;
  }

  const updatedExpense = expensesService.updateUser({
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(200).send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  deleteExpense,
  updateExpense,
};
