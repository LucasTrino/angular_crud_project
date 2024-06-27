import { Injectable } from '@angular/core';

import {
  CustomHttpsError,
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

  handleHttpError(error: any): CustomHttpsError {
    let CustomHttpsError: CustomHttpsError;

    switch (error.status) {
      case 400:
        CustomHttpsError = new ValidationError();
        break;
      case 401:
        CustomHttpsError = new AuthenticationError();
        break;
      case 403:
        CustomHttpsError = new AuthorizationError();
        break;
      case 404:
        CustomHttpsError = new NotFoundError();
        break;
      case 409:
        CustomHttpsError = new ConflictError();
        break;
      case 500:
        CustomHttpsError = new ServerError();
        break;
      case 503:
        CustomHttpsError = new NetworkError();
        break;
      default:
        CustomHttpsError = new UnknownError();
        break;
    }

    return CustomHttpsError;
  }

}
