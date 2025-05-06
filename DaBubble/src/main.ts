import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    importProvidersFrom(BrowserModule, BrowserAnimationsModule),
    ...(appConfig.providers ?? []),
  ],
}).catch((err) => console.error(err));
