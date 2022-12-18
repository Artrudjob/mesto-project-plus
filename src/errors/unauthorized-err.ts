import { UNAUTHORIZED_CODE } from '../constants/statusCodes';
import { IStatusError } from '../interface/interface';

export default class UnauthorizedErr implements IStatusError {
  statusCode = UNAUTHORIZED_CODE;

  name: string;

  message: string;

  constructor(message: string) {
    this.statusCode = UNAUTHORIZED_CODE;
    this.name = 'Unauthorized err';
    this.message = message;
  }
}
