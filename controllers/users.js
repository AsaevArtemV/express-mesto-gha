const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} = require('../errors/errors');

const SALT_ROUNDS = 10;
const JWT_SECRET = 'unique-secret-key';

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      next(err);
    });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(`Пользователь по указанному id: ${userId} не найден`));
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Получение пользователя с некорректным id: ${userId}`));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(`Пользователь по указанному id: ${userId} не найден`));
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Получение пользователя с некорректным id: ${userId}`));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((newUser) => {
      res.status(201).send({
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
        email: newUser.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Проверьте правильность заполнения полей: ${Object.values(err.errors)
          .map((error) => `${error.message.slice(5)}`)
          .join(' ')}`));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email существует'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(`Пользователь по указанному id: ${userId} не найден`));
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Проверьте правильность заполнения полей: ${Object.values(err.errors)
          .map((error) => `${error.message.slice(5)}`)
          .join(' ')}`));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь по указанному id: ${userId} не найден`);
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Проверьте правильность заполнения полей: ${Object.values(err.errors)
          .map((error) => `${error.message.slice(5)}`)
          .join(' ')}`));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Не передан email или пароль');
  }
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Такого пользователя не существует');
      }
      return bcrypt.compare(password, user.password)
        .then((correctPassword) => {
          if (!correctPassword) {
            throw new UnauthorizedError('Неверный пользователь или пароль');
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          return res.send({ jwt: token });
        });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  getCurrentUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
