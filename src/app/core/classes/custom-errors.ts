import { UserMessages } from '../classes/user-messages';

// Define an enum for error codes
export enum ErrorCodes {
  VALIDATION = 'ERROR_VALIDATION',
  NOT_FOUND = 'ERROR_NOT_FOUND',
  AUTHENTICATION = 'ERROR_AUTHENTICATION',
  AUTHORIZATION = 'ERROR_AUTHORIZATION',
  INTERNAL_SERVER = 'ERROR_INTERNAL_SERVER',
  SERVICE_UNAVAILABLE = 'ERROR_SERVICE_UNAVAILABLE',
  UNKNOWN = 'ERROR_UNKNOWN',
  CONFLICT = 'ERROR_CONFLICT'
}

const initializeGlobalHandleMapping = () => {
  const mapping = {
    [ErrorCodes.NOT_FOUND]: true as true,
    [ErrorCodes.INTERNAL_SERVER]: true as true,
    [ErrorCodes.UNKNOWN]: true as true,

    [ErrorCodes.SERVICE_UNAVAILABLE]: true as true,
    [ErrorCodes.VALIDATION]: true as true,
    [ErrorCodes.AUTHENTICATION]: true as true,
    [ErrorCodes.AUTHORIZATION]: true as true,
    [ErrorCodes.CONFLICT]: true as true,
  };
  return mapping;
};

export const GlobalHandleMapping = initializeGlobalHandleMapping();

export class CustomHttpsError extends Error {
  code: ErrorCodes;
  data?: any;
  shouldHandleGlobally: boolean;

  constructor(message: string, code: ErrorCodes, data?: any) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.data = data;
    this.shouldHandleGlobally = GlobalHandleMapping[code];
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends CustomHttpsError {
  constructor(message: string = UserMessages.ERROR_VALIDATION, data?: any) {
    super(message, ErrorCodes.VALIDATION, data);
  }
}

export class NotFoundError extends CustomHttpsError {
  constructor(message: string = UserMessages.ERROR_NOT_FOUND, data?: any) {
    super(message, ErrorCodes.NOT_FOUND, data);
  }
}

export class AuthenticationError extends CustomHttpsError {
  constructor(message: string = UserMessages.ERROR_AUTHENTICATION, data?: any) {
    super(message, ErrorCodes.AUTHENTICATION, data);
  }
}

export class AuthorizationError extends CustomHttpsError {
  constructor(message: string = UserMessages.ERROR_AUTHORIZATION, data?: any) {
    super(message, ErrorCodes.AUTHORIZATION, data);
  }
}

export class ServerError extends CustomHttpsError {
  constructor(message: string = UserMessages.ERROR_INTERNAL_SERVER, data?: any) {
    super(message, ErrorCodes.INTERNAL_SERVER, data);
  }
}

export class NetworkError extends CustomHttpsError {
  constructor(message: string = UserMessages.ERROR_SERVICE_UNAVAILABLE, data?: any) {
    super(message, ErrorCodes.SERVICE_UNAVAILABLE, data);
  }
}

export class UnknownError extends CustomHttpsError {
  constructor(message: string = UserMessages.ERROR_UNKNOWN, data?: any) {
    super(message, ErrorCodes.UNKNOWN, data);
  }
}

export class ConflictError extends CustomHttpsError {
  constructor(message: string = UserMessages.ERROR_CONFLICT, data?: any) {
    super(message, ErrorCodes.CONFLICT, data);
  }
}
