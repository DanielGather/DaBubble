import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'dabubble-b561d',
        appId: '1:131203295127:web:28782d008a560d9746c6d2',
        storageBucket: 'dabubble-b561d.firebasestorage.app',
        apiKey: 'AIzaSyA6KocQnqkHLSW5XKHidVF85xWmuAoZprw',
        authDomain: 'dabubble-b561d.firebaseapp.com',
        messagingSenderId: '131203295127',
        measurementId: 'G-XEKDELWWER',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
