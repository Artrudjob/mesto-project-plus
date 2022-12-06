import User from '../models/user';
import {Request, Response} from 'express';
import {CREATED_CODE, ERROR_CODE, NOT_FOUND_CODE, OK_CODE, SERVER_ERROR_CODE} from '../constants/statusCodes';

export const createUser = (req: Request, res: Response) => {
  User.create({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar
  })
    .then((user) => res.status(CREATED_CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({
          message: `Переданы некорректные данные при создании пользователя. Ошибка - ${err}`
        })
      } else {
        res.status(SERVER_ERROR_CODE).send({
          message: `На сервере произошла ошибка - ${err}`
        });
      }
    });
}

export const findByUserId = (req: Request, res: Response) => {
  User.findById(req.params.userId)
    .then((user) => res.status(OK_CODE).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_CODE).send({
          message: `Запрашиваемый пользователь не найден. Ошибка - ${err}`
        })
      } else {
        res.status(SERVER_ERROR_CODE).send({
          message: `На сервере произошла ошибка - ${err}`
        });
      }
    });
}

export const getAllUsers = (req: Request, res: Response) => {
  User.find({})
    .then((user) => res.status(OK_CODE).send(user))
    .catch((err) => res.status(SERVER_ERROR_CODE).send({message: `На сервере произошла ошибка - ${err}`}));
}

export const updateProfileUser = (req: Request, res: Response) => {
  const updatedProfile = {
    name: req.body.name,
    about: req.body.about
  }

  if (req.user) {
    User.findByIdAndUpdate(req.user._id, updatedProfile, {
      new: true,
      runValidators: true,
      upsert: false
    })
      .then(userProfile => res.status(OK_CODE).send(userProfile))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(ERROR_CODE).send({
            message: `Переданы некорректные данные при обновлении пользователя. Ошибка - ${err}`
          })
        } else if (err.message && ~err.message.indexOf('Cast to ObjectId failed for value')) {
          res.status(NOT_FOUND_CODE).send({
            message: `Пользователь с указанным _id не найден. Ошибка - ${err}`
          })
        } else {
          res.status(SERVER_ERROR_CODE).send({
            message: `На сервере произошла ошибка - ${err}`
          });
        }
      });
  }
}

export const updateAvatarUser = (req: Request, res: Response) => {
  if (req.user) {
    User.findByIdAndUpdate(req.user._id, {avatar: req.body.avatar}, {
      new: true,
      runValidators: true,
      upsert: false
    })
      .then(userAvatar => res.status(OK_CODE).send(userAvatar))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          console.log(err);
          res.status(ERROR_CODE).send({
            message: `Переданы некорректные данные при обновлении аватара. Ошибка - ${err}`
          })
        } else if (err.message && ~err.message.indexOf('Cast to ObjectId failed for value')) {
          res.status(NOT_FOUND_CODE).send({
            message: `Пользователь с указанным _id не найден. Ошибка - ${err}`
          })
        } else {
          res.status(SERVER_ERROR_CODE).send({
            message: `На сервере произошла ошибка - ${err}`
          });
        }
      });
  }
}