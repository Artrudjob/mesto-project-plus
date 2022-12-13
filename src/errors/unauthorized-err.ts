import { UNAUTHORIZED_CODE } from '../constants/statusCodes';

export class UnauthorizedErr extends Error {
  constructor(message: string) {
    super(message);
    this.statusCode = UNAUTHORIZED_CODE;
  }
}