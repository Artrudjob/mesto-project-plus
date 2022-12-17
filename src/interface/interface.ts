import { Request } from 'express';

export interface IUserId extends Request {
  user: { _id: string };
}

export interface IStatusError extends Error {
  statusCode: number;
}
