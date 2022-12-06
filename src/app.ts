import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { router as routerUsers } from './routes/users';
import { router as routerCards } from './routes/cards';

const app = express();
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;
const url = 'mongodb://localhost:27017/';

async function run() {
  try {
    await mongoose.connect(`${url}mestodb`);
    console.log('Подключение установлено!');
  } catch (err) {
    console.log(err)
  }
}

run().catch(console.log);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req: Request, res: Response, next) => {
  req.user = {
    _id: '638b2075c281fe16e99e5b46'
  }
  next();
})
app.use(routerUsers);
app.use(routerCards);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
