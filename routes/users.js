const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const validationСheck = require('../utils/validationСheck');

router.get('/', getAllUsers);

router.get(
  '/me',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24).hex(),
    }),
  }),
  getCurrentUser,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24).hex(),
    }),
  }),
  getUserById,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(validationСheck),
    }),
  }),
  updateAvatar,
);

module.exports = router;
