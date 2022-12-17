import { FORBIDDEN } from '../constants/statusCodes';
import { IStatusError } from '../interface/interface';

export default class ForbiddenErr implements IStatusError {
  statusCode = FORBIDDEN;
  name: string;
  message: string;
  constructor(message: string) {
    this.statusCode = FORBIDDEN;
    this.name = 'Forbidden err';
    this.message = message;
  }
}
