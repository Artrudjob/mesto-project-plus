import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { CREATED_CODE, OK_CODE } from '../constants/statusCodes';
import BadRequestErr from '../errors/bad-request-err';
import NotFoundCodeErr from '../errors/not-found-code-err';
import ForbiddenErr from '../errors/forbidden-err';
import { IUserId } from '../interface/interface';

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.body.owner,
  })
    .then((user) => res.status(CREATED_CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestErr('Переданы некорректные данные при создании карточки');
      }
    })
    .catch(next);
};

export const getAllCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .populate('owner')
    .then((card) => res.status(OK_CODE).send(card))
    .catch(next);
};

export const removeCard = (req: Request, res: Response, next: NextFunction) => {
  const request = req as IUserId;
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        const ownerId = card.owner.toString();

        if (ownerId === request.user._id) {
          res.status(OK_CODE).send({ removed: true, data: card });
        } else {
          throw new ForbiddenErr('Вы не можете удалить чужую карточку');
        }
      } else {
        throw new NotFoundCodeErr('Карточка с указанным _id не найдена');
      }
    })
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.body._id } }, { new: true })
    .then((liked) => res.status(OK_CODE).send(liked))
    .catch((err) => {
      if (err.message && ~err.message.indexOf('Cast to ObjectId failed for value')) {
        throw new NotFoundCodeErr('Передан несуществующий _id карточки');
      }
    })
    .catch(next);
};

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.body._id } }, { new: true })
    .then((disliked) => res.status(OK_CODE).send(disliked))
    .catch((err) => {
      if (err.message && ~err.message.indexOf('Cast to ObjectId failed for value')) {
        throw new NotFoundCodeErr('Передан несуществующий _id карточки');
      }
    })
    .catch(next);
};
