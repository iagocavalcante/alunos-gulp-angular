import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import Backendless from 'backendless';

const environment = {
  production: false,
  backendless: {
    APP_ID: '4E929F04-EF6E-B441-FFA9-9E50A76FB600',
    API_KEY: '568439CE-B1F5-E770-FF66-0C5C1D942400'
  }
};

Backendless.initApp(environment.backendless.APP_ID, environment.backendless.API_KEY);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
