const router = require('express').Router();
// eslint-disable-next-line import/extensions
const userRoutes = require('./users');
// eslint-disable-next-line import/extensions
const cardRoutes = require('./cards');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('*', (req, res) => {
  res.status(404).json({ message: 'Данная страница не найдена' });
});

module.exports = router;
