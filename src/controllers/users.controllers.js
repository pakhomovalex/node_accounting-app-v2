const usersServise = require('../services/users.service');

const getAllUsers = (req, res) => {
  res.status(200).send(usersServise.getAllUsers());
};

const getOneUser = (req, res) => {
  const { id } = req.params;

  if (typeof +id !== 'number') {
    res.sendStatus(400);
    res.send('Write a id for user');

    return;
  }

  const user = usersServise.getOne(+id);

  if (!user) {
    res.sendStatus(404);
    res.send('Not found');

    return;
  }

  res.status(200).send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
    res.send('Write a name for user');

    return;
  }

  const user = usersServise.create(name);

  res.status(201).send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!usersServise.getOne(id)) {
    res.sendStatus(404);
    res.send('Not found');

    return;
  }

  usersServise.deleteUser(id);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!usersServise.getOne(+id)) {
    res.sendStatus(404);
    res.send('Not found');

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);
    res.send('Write a name for user');

    return;
  }

  const updatedUser = usersServise.updateUser({ id, name });

  res.status(200).send(updatedUser);
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
};
