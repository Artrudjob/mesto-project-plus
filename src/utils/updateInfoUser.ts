import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { IUser } from '../models/user';
import { OK_CODE } from '../constants/statusCodes';
import BadRequestErr from '../errors/bad-request-err';
import NotFoundCodeErr from '../errors/not-found-code-err';
import { IUserId } from '../interface/interface';

interface IUserData {
  name?: string;
  about?: string;
  avatar?: string;
}

interface IOptions {
  new: boolean;
  runValidators: boolean;
  upsert: boolean;
}

export const updateInfoUser = (
  req: Request,
  res: Response,
  next: NextFunction,
  model: Model<IUser>,
  userData: IUserData,
  options: IOptions,
) => {
  const request = req as IUserId;
  model.findByIdAndUpdate(request.user._id, userData, options)
    .then((user) => {
      res.status(OK_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestErr('Переданы некорректные данные при обновлении пользователя');
        // eslint-disable-next-line no-bitwise
      } else if (err.message && ~err.message.indexOf('Cast to ObjectId failed for value')) {
        throw new NotFoundCodeErr('Пользователь с указанным _id не найден');
      }
    })
    .catch(next);
};
