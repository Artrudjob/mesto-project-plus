import { NOT_FOUND_CODE } from '../constants/statusCodes';

export default class NotFoundCodeErr extends Error {
  constructor(message: string) {
    super(message);
    this.statusCode = NOT_FOUND_CODE;
  }
}
