const router = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLike,
// eslint-disable-next-line import/extensions
} = require('../controllers/cards');

router.get('/', getAllCards);
router.delete('/:cardId', deleteCard);
router.post('/', createCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
