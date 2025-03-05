let expenses = [];

const getAllExpenses = () => expenses;

const getId = () =>
  expenses.length > 0 ? Math.max(...expenses.map((u) => u.id)) + 1 : 1;

const getOne = (id) => {
  return expenses.find((expense) => expense.id === +id) || null;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: getId(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const deleteExpense = (id) => {
  expenses = expenses.filter((e) => e.id !== +id);

  return expenses;
};

const updateExpense = ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expense = getOne(+id);

  Object.assign(expense, {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expense;
};

module.exports = {
  getAllExpenses,
  getOne,
  create,
  deleteExpense,
  updateExpense,
};
