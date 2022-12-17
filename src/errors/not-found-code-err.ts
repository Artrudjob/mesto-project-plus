import { NOT_FOUND_CODE } from '../constants/statusCodes';
import { IStatusError } from '../interface/interface';

export default class NotFoundCodeErr implements IStatusError {
  statusCode = NOT_FOUND_CODE;
  name: string;
  message: string;
  constructor(message: string) {
    this.statusCode = NOT_FOUND_CODE;
    this.name = 'Not found code err';
    this.message = message;
  }
}
