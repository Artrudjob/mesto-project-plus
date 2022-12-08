import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UNAUTHORIZED_CODE } from '../constants/statusCodes';

// @ts-ignore
interface ISessionRequest extends Request {
  user?: string | JwtPayload;
}


export default (req: ISessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(UNAUTHORIZED_CODE).send({
      message: 'Необходима авторизация'
    })
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, '0A51B6AFEA47A4B145BFB41FFA482E12B8482016D9E39D4FB09853219AC7E5BC');
  } catch (err) {
    return res.status(UNAUTHORIZED_CODE).send({
      message: 'Необходима авторизация'
    })
  }

  req.user = payload;

  next();
}
