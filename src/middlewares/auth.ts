import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UNAUTHORIZED_CODE } from '../constants/statusCodes';
import { JWT_SECRET } from '../../config';

// @ts-ignore
interface ISessionRequest extends Request {
  user?: string | JwtPayload;
}

// eslint-disable-next-line consistent-return
export default (req: ISessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(UNAUTHORIZED_CODE).send({
      message: 'Необходима авторизация',
    });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(UNAUTHORIZED_CODE).send({
      message: 'Необходима авторизация',
    });
  }

  req.user = payload;

  next();
};
