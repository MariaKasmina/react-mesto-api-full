const express = require('express');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const login = require('./routes/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const origin = [
  'https://mesto4places.nomoredomains.sbs',
  'http://mesto4places.nomoredomains.sbs',
  'http://localhost:3000',
  'http://api.mesto4places.nomoredomains.sbs',
  'https://api.mesto4places.nomoredomains.sbs',
];

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (origin.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));
app.use(requestLogger);

app.use(express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', login);
app.post('/signup', usersRouter);

app.use(auth);
// запросы ниже требуют авторизации

app.use('/', usersRouter);
app.use('/cards', cardRouter);

app.use(() => {
  throw new NotFoundError('Маршрут не найден');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'Ошибка по умолчанию.'
        : message,
    });

  next(err);
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
