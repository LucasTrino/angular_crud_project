import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding} from '@angular/router';
// import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    // provideClientHydration(),
  ]
};
