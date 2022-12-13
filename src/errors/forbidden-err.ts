import { FORBIDDEN } from '../constants/statusCodes';

export class ForbiddenErr extends Error {
  constructor(message: string) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}