// eslint-disable-next-line import/no-extraneous-dependencies
const mangoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const { Schema } = require('mongoose');

const cardSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
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
