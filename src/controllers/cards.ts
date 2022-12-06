import Card from '../models/card';
import {Request, Response} from 'express';
import {CREATED_CODE, ERROR_CODE, NOT_FOUND_CODE, OK_CODE, SERVER_ERROR_CODE} from "../constants/statusCodes";

export const createCard = (req: Request, res: Response) => {
  Card.create({
    name: req.body.name,
    link: req.body.link
  })
    .then((user) => res.status(CREATED_CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({
          message: `Переданы некорректные данные при создании карточки. Ошибка - ${err}`
        })
      } else {
        res.status(SERVER_ERROR_CODE).send({
          message: `На сервере произошла ошибка - ${err}`
        });
      }
    });
}

export const getAllCards = (req: Request, res: Response) => {
  Card.find({})
    .then((card) => res.status(OK_CODE).send(card))
    .catch((err) => res.status(SERVER_ERROR_CODE).send({
      message: `На сервере произошла ошибка - ${err}`
    }));
}

export const removeCard = (req: Request, res: Response) => {
  Card.findByIdAndRemove(req.params.id)
    .then(card => res.status(OK_CODE).send(card))
    .catch((err) => {
      if (err.message && ~err.message.indexOf('Cast to ObjectId failed for value')) {
        res.status(NOT_FOUND_CODE).send({
          message: `Карточка с указанным _id не найдена. Ошибка - ${err}`
        })
      } else {
        res.status(SERVER_ERROR_CODE).send({
          message: `На сервере произошла ошибка - ${err}`
        })
      }
    });
}

export const likeCard = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(req.params.cardId, {$addToSet: {likes: req.body._id}}, {new: true})
    .then(liked => res.status(OK_CODE).send(liked))
    .catch((err) => {
      if (err.message && ~err.message.indexOf('Cast to ObjectId failed for value')) {
        res.status(NOT_FOUND_CODE).send({
          message: `Передан несуществующий _id карточки. Ошибка - ${err}`
        })
      } else {
        res.status(SERVER_ERROR_CODE).send({
          message: `На сервере произошла ошибка - ${err}`
        })
      }
    });
}

export const dislikeCard = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(req.params.cardId, {$pull: {likes: req.body._id}}, {new: true})
    .then(disliked => res.status(OK_CODE).send(disliked))
    .catch((err) => {
      if (err.message && ~err.message.indexOf('Cast to ObjectId failed for value')) {
        res.status(NOT_FOUND_CODE).send({
          message: `Передан несуществующий _id карточки. Ошибка - ${err}`
        })
      } else {
        res.status(SERVER_ERROR_CODE).send({
          message: `На сервере произошла ошибка - ${err}`
        })
      }
    })
}