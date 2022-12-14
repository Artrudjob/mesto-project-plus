import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  createCard, dislikeCard, getAllCards, likeCard, removeCard,
} from '../controllers/cards';

const router = Router();

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(/^(https?|http):/).required(),
    owner: Joi.string().alphanum().required(),
  }),
}), createCard);

router.get('/cards', getAllCards);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required(),
  }),
}), removeCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required(),
  }),
  body: Joi.object().keys({
    likes: Joi.string().alphanum().required(),
  }),
}), likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required(),
  }),
  body: Joi.object().keys({
    likes: Joi.string().alphanum().required(),
  }),
}), dislikeCard);

// eslint-disable-next-line import/prefer-default-export
export { router };
