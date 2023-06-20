const express = require('express');
// eslint-disable-next-line import/no-unresolved
const helmet = require('helmet');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

// eslint-disable-next-line import/extensions
const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
  req.user = {
    _id: '64918ff663cba42f31cab441',
  };

  next();
});

app.use(routes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running on port ${PORT}`);
});
