require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.BASEURL || 'mongodb://localhost:27017/moviesdb');

app.use(requestLogger);

app.use(require('./routes/index'));

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Сервер успешно запущен');
});
