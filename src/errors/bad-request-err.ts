import { ERROR_CODE } from '../constants/statusCodes';

export default class BadRequestErr extends Error {
  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE;
  }
}
