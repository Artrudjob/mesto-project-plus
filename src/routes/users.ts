import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  findByUserId,
  getAllUsers,
  updateAvatarUser,
  updateProfileUser,
  getCurrentUser,
} from '../controllers/users';

const router = Router();

router.get('/users', getAllUsers);

router.get('/users/me', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required(),
  }),
}), getCurrentUser);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().required(),
  }),
}), findByUserId);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().alphanum().required(),
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(300).default('Исследователь'),
  }),
}), updateProfileUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().alphanum().required(),
    avatar: Joi.string().required().pattern(/^(https?|http):/),
  }),
}), updateAvatarUser);

export { router };
