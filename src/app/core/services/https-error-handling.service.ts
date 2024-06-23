import { Injectable } from '@angular/core';

import {
  CustomError,
  ValidationError,
  NotFoundError,
  AuthenticationError,
  AuthorizationError,
  ServerError,
  NetworkError,
  ConflictError,
  UnknownError
} from '../classes/custom-errors';

@Injectable({
  providedIn: 'root'
})
export class HttpsErrorHandling {

  handleHttpError(error: any): CustomError {
    let customError: CustomError;

    switch (error.status) {
      case 400:
        customError = new ValidationError();
        break;
      case 401:
        customError = new AuthenticationError();
        break;
      case 403:
        customError = new AuthorizationError();
        break;
      case 404:
        customError = new NotFoundError();
        break;
      case 409:
        customError = new ConflictError();
        break;
      case 500:
        customError = new ServerError();
        break;
      case 503:
        customError = new NetworkError();
        break;
      default:
        customError = new UnknownError();
        break;
    }

    return customError;
  }

}
