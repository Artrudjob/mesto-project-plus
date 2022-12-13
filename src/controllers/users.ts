import User from '../models/user';
import { NextFunction, Request, Response } from 'express';
import bcryp from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  CREATED_CODE,
  OK_CODE
} from '../constants/statusCodes';
import { BadRequestErr } from '../errors/bad-request-err';
import { UnauthorizedErr } from '../errors/unauthorized-err';
import { NotFoundCodeErr } from '../errors/not-found-code-err';
import { updateInfoUser } from '../utils/updateInfoUser';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  bcryp.hash(req.body.password, 10)
    .then((hash) => User.create({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar
      })
        .then((user) => res.status(CREATED_CODE).send(user))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequestErr('Переданы некорректные данные при создании пользователя');
          }
        })
        .catch(next)
    )
}

export const findByUserId = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.userId)
    .then((user) => res.status(OK_CODE).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundCodeErr('Запрашиваемый пользователь не найден');
      }
    })
    .catch(next)
}

export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((user) => res.status(OK_CODE).send(user))
    .catch(next);
}

export const updateProfileUser = (req: Request, res: Response, next: NextFunction) => {
  const updatedProfile = {
    name: req.body.name,
    about: req.body.about
  }

  updateInfoUser(req, res, next, User, updatedProfile, {
    new: true,
    runValidators: true,
    upsert: false
  });
}

export const updateAvatarUser = (req: Request, res: Response, next: NextFunction) => {
  updateInfoUser(req, res, next, User, {avatar: req.body.avatar}, {
    new: true,
    runValidators: true,
    upsert: false
  });
}

export const login = (req: Request, res: Response, next: NextFunction) => {
  User.findOne({ email: req.body.email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedErr('Неправильные почта или пароль')
      }

      return bcryp.compare(req.body.password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedErr('Неправильные почта или пароль')
          }

          const token = jwt.sign(
            {_id: user._id.toString()},
            '0A51B6AFEA47A4B145BFB41FFA482E12B8482016D9E39D4FB09853219AC7E5BC',
            { expiresIn: '7d'}
            )

          res.cookie('token', token, { httpOnly: true }).status(OK_CODE).send({
              loggedIn: true
            });
        })
        .catch(next)
    })
}

export const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  User.findById({ _id: req.user?._id })
    .then((user) => {
      res.status(OK_CODE).send(user);
    })
    .catch(next)
}