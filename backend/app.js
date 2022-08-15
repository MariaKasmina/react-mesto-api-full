const express = require('express');

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

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(requestLogger);


// Массив разешённых доменов
const allowedCors = [
  'https://mesto4places.nomoredomains.sbs',
  'http://mesto4places.nomoredomains.sbs',
  'localhost:3000'
];

app.use(function(req, res, next) {
  const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок

  if (allowedCors.includes(origin)) { // Проверяем, что значение origin есть среди разрешённых доменов
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
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
