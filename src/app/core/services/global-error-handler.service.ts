import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MessageService } from './message.service';
import { CustomHttpsError } from '../classes/custom-errors'
import { UserMessages } from '../classes/user-messages'

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: unknown) {
    const messageService = this.injector.get(MessageService);

    if (error instanceof CustomHttpsError) {
      if (!error.shouldHandleGlobally) return;
      messageService.showError(error.message)
      console.error(`${error.code} : ${error.message}`);
    }  else {
      messageService.showError(UserMessages.ERROR_UNKNOWN);
      console.error(error);
    }

  }
}
