import { ApplicationConfig, ErrorHandler, importProvidersFrom  } from '@angular/core';
import { provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, HttpClientModule, withFetch } from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GlobalErrorHandler } from '../app/core/services/global-error-handler.service'

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(MatSnackBarModule, BrowserAnimationsModule, HttpClientModule),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    provideAnimations(),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
};
