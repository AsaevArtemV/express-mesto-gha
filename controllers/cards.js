// eslint-disable-next-line import/extensions
const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

function createCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((newCard) => {
      res.status(201).send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: Object.values(err.errors)
            .map((error) => error.message)
            .join(', '),
        });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
}

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({
          message: `Карточка с указанным id: ${cardId} отсутствует.`,
        });
      } else {
        Card.findByIdAndRemove(cardId)
          .then((removedCard) => res.status(200).send(removedCard));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Карточки с указанным id: ${cardId} нет в базе данных.` });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Карточка с указанным id: ${cardId} не существует.` });
      } else {
        Card.findByIdAndUpdate(
          req.params.cardId,
          { $addToSet: { likes: req.user._id } },
          { new: true },
        )
          .then((removedCard) => res.status(200).send(removedCard));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Карточки с указанным id: ${cardId} нет в базе данных.` });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

const deleteLike = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        res.status(404)
          .send({ message: `Карточки с указанным id: ${cardId} нет.` });
      } else {
        Card.findByIdAndUpdate(
          req.params.cardId,
          { $pull: { likes: req.user._id } },
          { new: true },
        )
          .then((removedCard) => res.status(200).send(removedCard));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Карточки с указанным id: ${cardId} нет в базе данных.` });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLike,
};
