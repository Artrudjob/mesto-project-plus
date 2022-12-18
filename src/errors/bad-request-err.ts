import { ERROR_CODE } from '../constants/statusCodes';
import { IStatusError } from '../interface/interface';

export default class BadRequestErr implements IStatusError {
  statusCode: number;

  message: string;

  name: string;

  constructor(message: string) {
    this.statusCode = ERROR_CODE;
    this.name = 'Bad request';
    this.message = message;
  }
}
