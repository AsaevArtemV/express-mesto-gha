// eslint-disable-next-line import/extensions
const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Пользователь по указанному id: ${userId} не найден.` });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Получение пользователя с некорректным id: ${userId}` });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

const createUser = (req, res) => {
  const newUserData = req.body;

  User.create(newUserData)
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `Пожалуйста, проверьте правильность заполнения полей: ${Object.values(err.errors)
            .map((error) => `${error.message.slice(5)}`)
            .join(' ')}`,
        });
      } else {
        res.status(500)
          .send({ message: 'Ошибка сервера' });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404)
          .send({ message: `Пользователь по указанному id: ${userId} не найден.` });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `Пожалуйста, проверьте правильность заполнения полей: ${Object.values(err.errors)
            .map((error) => `${error.message.slice(5)}`)
            .join(' ')}`,
        });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404)
          .send({ message: `Пользователь по указанному id: ${userId} не найден.` });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `Пожалуйста, проверьте правильность заполнения полей: ${Object.values(err.errors)
            .map((error) => `${error.message.slice(5)}`)
            .join(' ')}`,
        });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
