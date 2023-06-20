// eslint-disable-next-line import/no-extraneous-dependencies
const mangoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const { Schema } = require('mongoose');

const cardSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  link: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "name" должно быть заполнено'],
  },
  likes: {
    default: [],
    type: [
      {
        type: Schema.Types.ObjectId,
        reference: 'user',
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mangoose.model('card', cardSchema);
