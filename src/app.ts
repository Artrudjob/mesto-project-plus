import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { celebrate, errors, Joi } from 'celebrate';
import { router as routerUsers } from './routes/users';
import { router as routerCards } from './routes/cards';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';
import { createUser, login } from './controllers/users';
import { SERVER_ERROR_CODE } from './constants/statusCodes';
import { PORT, DB_ADDRESS } from '../config';

const app = express();
const bodyParser = require('body-parser');

async function run() {
  try {
    await mongoose.connect(`${DB_ADDRESS}`);
    // eslint-disable-next-line no-console
    console.log('Подключение установлено!');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

// eslint-disable-next-line no-console
run().catch(console.log);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(200).default('Исследователь'),
    avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  }),
}), createUser);

app.use(auth);
app.use(routerUsers);
app.use(routerCards);

app.use(errorLogger);

app.use(errors());
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === SERVER_ERROR_CODE ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${PORT}`);
});
